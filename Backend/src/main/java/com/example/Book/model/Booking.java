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
@Table(name = "booking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Consumer consumer;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Services services;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = true)
    private GroupBooking group;

    private LocalDateTime bookingDateTime;
    private Boolean status;
}