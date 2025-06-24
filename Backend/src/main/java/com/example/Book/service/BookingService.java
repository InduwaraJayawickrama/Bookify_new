package com.example.Book.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Book.dto.BookingDTO;
import com.example.Book.dto.ScheduleDTO;
import com.example.Book.dto.ServiceDTO;
import com.example.Book.dto.ServiceDateTimeDTO;
import com.example.Book.dto.ServiceProviderDTO;
import com.example.Book.model.Booking;
import com.example.Book.model.Consumer;
import com.example.Book.model.Schedule;
import com.example.Book.model.ServiceProvider;
import com.example.Book.model.Services;
import com.example.Book.repo.BookingRepository;
import com.example.Book.repo.ConsumerRepository;
import com.example.Book.repo.ScheduleRepository;
import com.example.Book.repo.ServiceDateTimeRepository;
import com.example.Book.repo.ServiceProviderRepository;
import com.example.Book.repo.ServiceRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class BookingService {

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ConsumerRepository consumerRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    @Autowired
    private ServiceDateTimeRepository serviceDateTimeRepository;


    public List<ServiceProviderDTO> getAllServiceProvidersWithServices() {
        // Get all service providers
        List<ServiceProvider> providers = serviceProviderRepository.findAll();

        // Convert to DTOs with associated services
        return providers.stream()
                .map(this::convertToServiceProviderDTO)
                .collect(Collectors.toList());
    }

    private ServiceProviderDTO convertToServiceProviderDTO(ServiceProvider provider) {
        // Find all services for this provider
        List<Services> services = serviceRepository.findByProvider(provider);

        // Convert services to DTOs
        List<ServiceDTO> serviceDTOs = services.stream()
                .map(this::convertToServiceDTO)
                .collect(Collectors.toList());

        // Create and return the provider DTO with services
        return new ServiceProviderDTO(
                provider.getProvider_id(),
                provider.getUsername(),
                provider.getEmail(),
                provider.getAddress(),
                provider.getContact(),
                provider.getExperience(),
                provider.getIsActive(),
                serviceDTOs,
                provider.getProfileImage(),  // Add the image parameter
                provider.getFirstName(),
                provider.getLastName()
        );
    }

    private ServiceDTO convertToServiceDTO(Services service) {
        return new ServiceDTO(
                service.getServiceId(),
                service.getName(),
                service.getSpecialization(),
                service.getPrice(),
                service.getDescription(),
                service.getCategory()
        );
    }

    public List<ScheduleDTO> getSchedulesByProviderId(Long providerId) {
        // Check if provider exists
        ServiceProvider provider = serviceProviderRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Service Provider not found with id: " + providerId));

        // Get all schedules for this provider
        List<Schedule> schedules = scheduleRepository.findByProvider(provider);

        // Convert to DTOs
        return schedules.stream()
                .map(this::convertToScheduleDTO)
                .collect(Collectors.toList());
    }

    private ScheduleDTO convertToScheduleDTO(Schedule schedule) {
        ServiceProvider provider = schedule.getProvider();
        //Consumer consumer = schedule.getConsumer();

        return new ScheduleDTO(
                schedule.getScheduleId(),
                provider.getProvider_id(),
                //consumer.getConsumerId(),
                schedule.getDateTime()
        );
    }

    @Transactional
    public Booking saveBooking(BookingDTO requestDTO) {
        // Fetch related entities
        Consumer consumer = consumerRepository.findById(Long.valueOf(requestDTO.getConsumerId()))
                .orElseThrow(() -> new RuntimeException("Consumer not found with id: " + requestDTO.getConsumerId()));

        Services service = serviceRepository.findById(requestDTO.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + requestDTO.getServiceId()));

        /*// GroupBooking is optional
        GroupBooking group = null;
        if (requestDTO.getGroupId() != null) {
            group = groupBookingRepository.findById(requestDTO.getGroupId())
                    .orElseThrow(() -> new RuntimeException("Group not found with id: " + requestDTO.getGroupId()));
        }*/

        // Create and populate the booking
        Booking booking = new Booking();
        booking.setConsumer(consumer);
        booking.setServices(service);
        //booking.setGroup(group);
        booking.setBookingDateTime(requestDTO.getBookingDateTime());
        booking.setStatus(true); // Default to active/confirmed

        // Save and return
        return bookingRepository.save(booking);
    }

    public Schedule createSchedule(ScheduleDTO scheduleDTO) {
        // Find the service provider by ID
        ServiceProvider provider = serviceProviderRepository
                .findById(scheduleDTO.getProviderId())
                .orElseThrow(() -> new EntityNotFoundException("ServiceProvider not found with ID: " + scheduleDTO.getProviderId()));

        // Create a new Schedule entity
        Schedule schedule = new Schedule();
        schedule.setProvider(provider);
        schedule.setDateTime(scheduleDTO.getDateTime());

        // Save and return the schedule
        return scheduleRepository.save(schedule);
    }

    public List<ServiceDateTimeDTO> getServiceDateTimeByProviderId(Long providerId) {
        return serviceDateTimeRepository.findByProviderId(providerId);
    }

    public ServiceProviderDTO getServiceProviderDetailsById(Long providerId) {
        // Fetch the service provider from the repository
        ServiceProvider provider = serviceProviderRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Service Provider not found with id: " + providerId));

        // Convert the provider and its associated services to a DTO
        return convertToServiceProviderDTO(provider);
    }
}