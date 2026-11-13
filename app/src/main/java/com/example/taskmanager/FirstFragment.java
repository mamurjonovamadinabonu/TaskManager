package com.example.taskmanager;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;

import com.example.taskmanager.databinding.DialogAddTaskBinding;
import com.example.taskmanager.databinding.FragmentFirstBinding;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

public class FirstFragment extends Fragment implements TaskAdapter.OnTaskListener {

    private FragmentFirstBinding binding;
    private TaskRepository repository;
    private TaskAdapter adapter;
    private List<Task> taskList;

    private final ActivityResultLauncher<String> requestPermissionLauncher =
            registerForActivityResult(new ActivityResultContracts.RequestPermission(), isGranted -> {
                if (isGranted) {
                    Toast.makeText(requireContext(), "Bildirishnoma ruxsati berildi! 🌸", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(requireContext(), "Eslatmalar uchun bildirishnoma ruxsati kerak! ⚠️", Toast.LENGTH_LONG).show();
                }
            });

    @Override
    public View onCreateView(
            @NonNull LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState
    ) {
        binding = FragmentFirstBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        repository = new TaskRepository(requireContext());
        taskList = repository.getTasks();

        adapter = new TaskAdapter(taskList, this);
        binding.recyclerviewTasks.setLayoutManager(new LinearLayoutManager(requireContext()));
        binding.recyclerviewTasks.setAdapter(adapter);

        updateEmptyView();
        checkNotificationPermission();
        scheduleReminderWorker();

        // Wire up MainActivity FAB to open Add Task dialog
        if (getActivity() instanceof MainActivity) {
            FloatingActionButton fab = getActivity().findViewById(R.id.fab);
            if (fab != null) {
                fab.setImageResource(android.R.drawable.ic_input_add);
                fab.setOnClickListener(v -> showAddTaskDialog());
            }
        }
    }

    private void checkNotificationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(
                    requireContext(),
                    Manifest.permission.POST_NOTIFICATIONS
            ) != PackageManager.PERMISSION_GRANTED) {
                requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS);
            }
        }
    }

    private void scheduleReminderWorker() {
        PeriodicWorkRequest request = new PeriodicWorkRequest.Builder(
                ReminderWorker.class, 15, TimeUnit.MINUTES
        ).build();

        WorkManager.getInstance(requireContext()).enqueueUniquePeriodicWork(
                "TaskReminderWork",
                ExistingPeriodicWorkPolicy.KEEP,
                request
        );
    }

    private void showAddTaskDialog() {
        DialogAddTaskBinding dialogBinding = DialogAddTaskBinding.inflate(getLayoutInflater());

        new MaterialAlertDialogBuilder(requireContext())
                .setView(dialogBinding.getRoot())
                .setPositiveButton("Qo'shish", (dialog, which) -> {
                    String title = dialogBinding.editTaskTitle.getText() != null ? dialogBinding.editTaskTitle.getText().toString().trim() : "";
                    String desc = dialogBinding.editTaskDesc.getText() != null ? dialogBinding.editTaskDesc.getText().toString().trim() : "";

                    if (!title.isEmpty()) {
                        Task newTask = new Task(
                                UUID.randomUUID().toString(),
                                title,
                                desc,
                                false,
                                System.currentTimeMillis()
                        );
                        repository.addTask(newTask);
                        taskList = repository.getTasks();
                        adapter.setTasks(taskList);
                        updateEmptyView();

                        // Cancel any 'all completed' notification since we have a new pending task
                        NotificationHelper.cancelNotification(requireContext());
                        Toast.makeText(requireContext(), "Vazifa qo'shildi! 🌸", Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(requireContext(), "Iltimos, vazifa nomini kiriting!", Toast.LENGTH_SHORT).show();
                    }
                })
                .setNegativeButton("Bekor qilish", null)
                .show();
    }

    @Override
    public void onTaskCheckedChange(Task task, boolean isChecked) {
        repository.updateTask(task);
        taskList = repository.getTasks();
        adapter.setTasks(taskList);
        updateEmptyView();

        // Check if all tasks are completed
        if (!repository.hasPendingTasks()) {
            NotificationHelper.cancelNotification(requireContext());
            Toast.makeText(requireContext(), "Barakalla! Barcha vazifalar bajarildi! 🎉💖", Toast.LENGTH_SHORT).show();
        } else {
            // Still have pending tasks, make sure reminder is active
            NotificationHelper.showReminderNotification(requireContext());
        }
    }

    @Override
    public void onTaskDelete(Task task) {
        repository.deleteTask(task.getId());
        taskList = repository.getTasks();
        adapter.setTasks(taskList);
        updateEmptyView();

        if (!repository.hasPendingTasks()) {
            NotificationHelper.cancelNotification(requireContext());
        }
        Toast.makeText(requireContext(), "Vazifa o'chirildi", Toast.LENGTH_SHORT).show();
    }

    private void updateEmptyView() {
        if (taskList == null || taskList.isEmpty()) {
            binding.recyclerviewTasks.setVisibility(View.GONE);
            binding.textEmpty.setVisibility(View.VISIBLE);
        } else {
            binding.recyclerviewTasks.setVisibility(View.VISIBLE);
            binding.textEmpty.setVisibility(View.GONE);
        }
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}
