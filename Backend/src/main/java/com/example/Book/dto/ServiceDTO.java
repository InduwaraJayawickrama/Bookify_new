package com.example.Book.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDTO {
    private Integer serviceId;
    private String name;
    private String specialization;
    private Double price;
    private String description;
    private String category;
}