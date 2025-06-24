package com.example.Book.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Book.model.Reminder;
import com.example.Book.repo.ReminderRepository;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    private final String TWILIO_ACCOUNT_SID = "your_account_sid";
    private final String TWILIO_AUTH_TOKEN = "your_auth_token";
    private final String TWILIO_PHONE_NUMBER = "your_twilio_phone_number";

    public Reminder createReminder(Reminder reminder) {
        return reminderRepository.save(reminder);
    }

    public List<Reminder> getAllReminders() {
        return reminderRepository.findAll();
    }

    public Reminder getReminderById(Integer id) {
        return reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found with id: " + id));
    }

    public Reminder updateReminder(Integer id, Reminder reminderDetails) {
        Reminder reminder = getReminderById(id);
        reminder.setDescription(reminderDetails.getDescription());
        reminder.setReminderDateTime(reminderDetails.getReminderDateTime());
        reminder.setStatus(reminderDetails.getStatus());
        return reminderRepository.save(reminder);
    }

    public void deleteReminder(Integer id) {
        Reminder reminder = getReminderById(id);
        reminderRepository.delete(reminder);
    }
} 