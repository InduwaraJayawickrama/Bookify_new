package com.example.Book.controller;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Book.model.ServiceDateTime;
import com.example.Book.model.ServiceProvider;
import com.example.Book.model.Services;
import com.example.Book.repo.ServiceDateTimeRepository;
import com.example.Book.repo.ServiceProviderRepository;
import com.example.Book.repo.ServiceRepository;
import com.example.Book.service.JWTService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/service-providers")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    @Autowired
    private ServiceDateTimeRepository serviceDateTimeRepository;

    @Autowired
    private JWTService jwtService;

    private final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

    @GetMapping("/services")
    public ResponseEntity<List<Map<String, Object>>> getProviderServices(@RequestHeader("Authorization") String token) {
        String email = extractEmailFromToken(token);
        ServiceProvider provider = serviceProviderRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        
        List<Services> services = serviceRepository.findByProvider(provider);
        
        // Convert services to include ServiceDateTime information
        List<Map<String, Object>> servicesWithDateTime = services.stream().map(service -> {
            Map<String, Object> serviceMap = new HashMap<>();
            serviceMap.put("serviceId", service.getServiceId());
            serviceMap.put("name", service.getName());
            serviceMap.put("specialization", service.getSpecialization());
            serviceMap.put("price", service.getPrice());
            serviceMap.put("description", service.getDescription());
            serviceMap.put("category", service.getCategory());
            
            // Get ServiceDateTime information
            ServiceDateTime serviceDateTime = serviceDateTimeRepository.findByServices(service)
                    .orElse(null);
            
            if (serviceDateTime != null) {
                serviceMap.put("workHours", Map.of(
                    "start", serviceDateTime.getWorkHoursStart().toLocalTime().format(timeFormatter),
                    "end", serviceDateTime.getWorkHoursEnd().toLocalTime().format(timeFormatter)
                ));
                
                try {
                    serviceMap.put("workingDays", new ObjectMapper().readValue(
                        serviceDateTime.getWorkingDays(), Map.class));
                } catch (JsonProcessingException e) {
                    serviceMap.put("workingDays", new HashMap<>());
                }
                
                serviceMap.put("timePackages", serviceDateTime.getTimePackages());
            }
            
            return serviceMap;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(servicesWithDateTime);
    }

    @PostMapping("/services")
    public ResponseEntity<Services> createService(@RequestBody Map<String, Object> serviceData,
                                                @RequestHeader("Authorization") String token) {
        String email = extractEmailFromToken(token);
        ServiceProvider provider = serviceProviderRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        // Create and save the service
        Services service = new Services();
        service.setProvider(provider);
        service.setName((String) serviceData.get("name"));
        service.setSpecialization((String) serviceData.get("specialization"));
        service.setPrice(Double.parseDouble(serviceData.get("price").toString()));
        service.setDescription((String) serviceData.get("description"));
        service.setCategory((String) serviceData.get("category"));
        
        Services savedService = serviceRepository.save(service);

        // Create and save the service date time settings
        ServiceDateTime serviceDateTime = new ServiceDateTime();
        serviceDateTime.setServices(savedService);

        @SuppressWarnings("unchecked")
        Map<String, String> workHours = (Map<String, String>) serviceData.get("workHours");
        
        // Convert time strings to LocalDateTime with today's date
        LocalTime startTime = LocalTime.parse(workHours.get("start"), timeFormatter);
        LocalTime endTime = LocalTime.parse(workHours.get("end"), timeFormatter);
        
        LocalDateTime startDateTime = LocalDateTime.now().with(startTime);
        LocalDateTime endDateTime = LocalDateTime.now().with(endTime);
        
        serviceDateTime.setWorkHoursStart(startDateTime);
        serviceDateTime.setWorkHoursEnd(endDateTime);
        
        @SuppressWarnings("unchecked")
        Map<String, Boolean> workingDays = (Map<String, Boolean>) serviceData.get("workingDays");
        try {
            serviceDateTime.setWorkingDays(new ObjectMapper().writeValueAsString(workingDays));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing working days", e);
        }
        
        // Set timePackages with default value of 4 if not provided
        Object timePackagesObj = serviceData.get("timePackages");
        if (timePackagesObj != null) {
            if (timePackagesObj instanceof String) {
                serviceDateTime.setTimePackages(Integer.parseInt((String) timePackagesObj));
            } else if (timePackagesObj instanceof Integer) {
                serviceDateTime.setTimePackages((Integer) timePackagesObj);
            } else if (timePackagesObj instanceof Number) {
                serviceDateTime.setTimePackages(((Number) timePackagesObj).intValue());
            } else {
                serviceDateTime.setTimePackages(4); // Default value if type is unknown
            }
        } else {
            serviceDateTime.setTimePackages(4); // Default value
        }
        
        serviceDateTimeRepository.save(serviceDateTime);

        return ResponseEntity.ok(savedService);
    }

    @PutMapping("/services")
    public ResponseEntity<Services> updateService(@RequestBody Map<String, Object> serviceData,
                                                @RequestHeader("Authorization") String token) {
        String email = extractEmailFromToken(token);
        ServiceProvider provider = serviceProviderRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        // Find existing service for this provider
        List<Services> existingServices = serviceRepository.findByProvider(provider);
        Services service = existingServices.isEmpty() ? new Services() : existingServices.get(0);
        
        // Update service details
        service.setProvider(provider);
        service.setName((String) serviceData.get("name"));
        service.setSpecialization((String) serviceData.get("specialization"));
        service.setPrice(Double.parseDouble(serviceData.get("price").toString()));
        service.setDescription((String) serviceData.get("description"));
        service.setCategory((String) serviceData.get("category"));
        
        Services savedService = serviceRepository.save(service);

        // Update service date time settings
        ServiceDateTime serviceDateTime = serviceDateTimeRepository.findByServices(service)
                .orElseGet(() -> {
                    ServiceDateTime newServiceDateTime = new ServiceDateTime();
                    newServiceDateTime.setServices(savedService);
                    return newServiceDateTime;
                });

        @SuppressWarnings("unchecked")
        Map<String, String> workHours = (Map<String, String>) serviceData.get("workHours");
        
        // Convert time strings to LocalDateTime with today's date
        LocalTime startTime = LocalTime.parse(workHours.get("start"), timeFormatter);
        LocalTime endTime = LocalTime.parse(workHours.get("end"), timeFormatter);
        
        LocalDateTime startDateTime = LocalDateTime.now().with(startTime);
        LocalDateTime endDateTime = LocalDateTime.now().with(endTime);
        
        serviceDateTime.setWorkHoursStart(startDateTime);
        serviceDateTime.setWorkHoursEnd(endDateTime);
        
        @SuppressWarnings("unchecked")
        Map<String, Boolean> workingDays = (Map<String, Boolean>) serviceData.get("workingDays");
        try {
            serviceDateTime.setWorkingDays(new ObjectMapper().writeValueAsString(workingDays));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing working days", e);
        }
        
        // Set timePackages with default value of 4 if not provided
        Object timePackagesObj = serviceData.get("timePackages");
        if (timePackagesObj != null) {
            if (timePackagesObj instanceof String) {
                serviceDateTime.setTimePackages(Integer.parseInt((String) timePackagesObj));
            } else if (timePackagesObj instanceof Integer) {
                serviceDateTime.setTimePackages((Integer) timePackagesObj);
            } else if (timePackagesObj instanceof Number) {
                serviceDateTime.setTimePackages(((Number) timePackagesObj).intValue());
            } else {
                serviceDateTime.setTimePackages(4); // Default value if type is unknown
            }
        } else {
            serviceDateTime.setTimePackages(4); // Default value
        }
        
        serviceDateTimeRepository.save(serviceDateTime);

        return ResponseEntity.ok(savedService);
    }

    private String extractEmailFromToken(String token) {
        if (token == null || token.isEmpty()) {
            throw new RuntimeException("No authorization token provided");
        }

        // Remove "Bearer " prefix if present
        String actualToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        
        // Extract email from token
        String email = jwtService.extractUserName(actualToken);
        if (email == null || email.isEmpty()) {
            throw new RuntimeException("Invalid token: Could not extract email");
        }
        
        return email;
    }
} 