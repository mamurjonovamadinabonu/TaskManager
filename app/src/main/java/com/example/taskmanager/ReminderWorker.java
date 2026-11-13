package com.example.taskmanager;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

public class ReminderWorker extends Worker {

    public ReminderWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
    }

    @NonNull
    @Override
    public Result doWork() {
        TaskRepository repository = new TaskRepository(getApplicationContext());
        if (repository.hasPendingTasks()) {
            NotificationHelper.showReminderNotification(getApplicationContext());
        } else {
            NotificationHelper.cancelNotification(getApplicationContext());
        }
        return Result.success();
    }
}
