package com.example.Book.repo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Book.model.Reminder;

public interface ReminderRepository extends JpaRepository<Reminder, Integer> {
    List<Reminder> findByReminderDateTimeBetweenAndStatus(LocalDateTime start, LocalDateTime end, String status);
}
