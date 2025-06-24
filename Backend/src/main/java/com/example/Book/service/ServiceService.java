package com.example.Book.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Book.model.ServiceProvider;
import com.example.Book.model.Services;
import com.example.Book.repo.ServiceProviderRepository;
import com.example.Book.repo.ServiceRepository;

@Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    public List<Services> getServicesByProviderEmail(String email) {
        ServiceProvider provider = serviceProviderRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Service Provider not found with email: " + email));
        return serviceRepository.findByProvider(provider);
    }

    public Services updateService(String email, Services service) {
        ServiceProvider provider = serviceProviderRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Service Provider not found with email: " + email));
        
        // If service has an ID, update existing service
        if (service.getServiceId() != null) {
            Services existingService = serviceRepository.findById(service.getServiceId())
                    .orElseThrow(() -> new RuntimeException("Service not found"));
            
            // Verify the service belongs to the provider
            if (!existingService.getProvider().getProvider_id().equals(provider.getProvider_id())) {
                throw new RuntimeException("Service does not belong to this provider");
            }

            // Update service details
            existingService.setName(service.getName());
            existingService.setSpecialization(service.getSpecialization());
            existingService.setPrice(service.getPrice());
            existingService.setDescription(service.getDescription());
            existingService.setCategory(service.getCategory());

            return serviceRepository.save(existingService);
        } else {
            // Create new service
            service.setProvider(provider);
            return serviceRepository.save(service);
        }
    }
} 