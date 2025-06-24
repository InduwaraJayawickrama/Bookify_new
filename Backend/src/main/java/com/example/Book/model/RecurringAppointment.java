package com.example.Book.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "recurring_appointment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecurringAppointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recurrenceId;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private String recurrenceType;
}