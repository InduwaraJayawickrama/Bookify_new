package com.example.Book.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Integer consumerId;
    private Integer serviceId;
    //private Integer groupId;  // Optional, can be null
    private LocalDateTime bookingDateTime;
    //private Boolean status;
}