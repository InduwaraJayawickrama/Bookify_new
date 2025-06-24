package com.example.Book.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDTO {
    private Integer scheduleId;

    private Long providerId;
    //private Long consumerId;

    private LocalDateTime dateTime;
}