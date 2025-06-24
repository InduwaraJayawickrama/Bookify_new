package com.example.Book.dto;

import java.time.LocalDateTime;

import com.example.Book.model.ServiceDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDateTimeDTO {
    private Long serviceDateTimeId;

    private LocalDateTime workHoursStart;

    private LocalDateTime workHoursEnd;

    private String workingDays;

    private Integer timePackages;


    public ServiceDateTimeDTO(ServiceDateTime serviceDateTime) {
        this.serviceDateTimeId = serviceDateTime.getServiceDateTimeId();
        this.workHoursStart = serviceDateTime.getWorkHoursStart();
        this.workHoursEnd = serviceDateTime.getWorkHoursEnd();
        this.workingDays = serviceDateTime.getWorkingDays();
        this.timePackages = serviceDateTime.getTimePackages();
    }

    public ServiceDateTimeDTO(Long serviceDateTimeId, LocalDateTime workHoursStart, LocalDateTime workHoursEnd, Integer timePackages, String workingDays) {
        this.serviceDateTimeId = serviceDateTimeId;
        this.workHoursStart = workHoursStart;
        this.workHoursEnd = workHoursEnd;
        this.timePackages = timePackages;
        this.workingDays = workingDays;
    }

}
