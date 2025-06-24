package com.example.Book.service;

import com.example.Book.model.Reminder;
import com.example.Book.repo.ReminderRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReminderScheduler {

    private final ReminderRepository reminderRepository;
    private final NotificationService notificationService;

    public ReminderScheduler(ReminderRepository reminderRepository, NotificationService notificationService) {
        this.reminderRepository = reminderRepository;
        this.notificationService = notificationService;
    }

    @Scheduled(fixedRate = 60000) // Runs every 60 seconds
    public void checkAndSendReminders() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime futureTime = now.plusMinutes(15); // Check for reminders due in the next 15 minutes

        List<Reminder> reminders = reminderRepository.findByReminderDateTimeBetweenAndStatus(now, futureTime, "PENDING");

        for (Reminder reminder : reminders) {
            notificationService.sendNotification(reminder);
            reminder.setStatus("SENT");
            reminderRepository.save(reminder);
        }
    }
}
