package com.example.taskmanager;

import android.content.Context;
import android.content.SharedPreferences;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class TaskRepository {
    private static final String PREF_NAME = "task_manager_prefs";
    private static final String KEY_TASKS = "tasks_list";
    private final SharedPreferences sharedPreferences;
    private final Gson gson;

    public TaskRepository(Context context) {
        sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        gson = new Gson();
    }

    public List<Task> getTasks() {
        String json = sharedPreferences.getString(KEY_TASKS, null);
        if (json == null) {
            return new ArrayList<>();
        }
        Type type = new TypeToken<ArrayList<Task>>() {}.getType();
        List<Task> tasks = gson.fromJson(json, type);
        return tasks != null ? tasks : new ArrayList<>();
    }

    public void saveTasks(List<Task> tasks) {
        String json = gson.toJson(tasks);
        sharedPreferences.edit().putString(KEY_TASKS, json).apply();
    }

    public void addTask(Task task) {
        List<Task> tasks = getTasks();
        tasks.add(0, task);
        saveTasks(tasks);
    }

    public void updateTask(Task updatedTask) {
        List<Task> tasks = getTasks();
        for (int i = 0; i < tasks.size(); i++) {
            if (tasks.get(i).getId().equals(updatedTask.getId())) {
                tasks.set(i, updatedTask);
                break;
            }
        }
        saveTasks(tasks);
    }

    public void deleteTask(String taskId) {
        List<Task> tasks = getTasks();
        tasks.removeIf(task -> task.getId().equals(taskId));
        saveTasks(tasks);
    }

    public boolean hasPendingTasks() {
        List<Task> tasks = getTasks();
        for (Task task : tasks) {
            if (!task.isCompleted()) {
                return true;
            }
        }
        return false;
    }
}
