package com.example.Book.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Book.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
}