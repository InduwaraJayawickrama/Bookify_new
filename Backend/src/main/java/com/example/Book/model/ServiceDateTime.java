package com.example.Book.model;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.Column;
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

@CrossOrigin(origins = "http://localhost:3000")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "service_date_time")
public class ServiceDateTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceDateTimeId;

    // Working hours
    @Column(name = "work_hours_start", nullable = false)
    private LocalDateTime workHoursStart;

    @Column(name = "work_hours_end", nullable = false)
    private LocalDateTime workHoursEnd;

    // Working days stored as JSON
    @Column(name = "working_days", columnDefinition = "json")
    private String workingDays;

    // Time slots
    @Column(name = "time_packages", nullable = false)
    private Integer timePackages;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Services services;
}
