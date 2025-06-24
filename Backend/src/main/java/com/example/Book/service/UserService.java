package com.example.Book.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Book.model.Consumer;
import com.example.Book.model.ServiceProvider;
import com.example.Book.repo.ConsumerRepository;
import com.example.Book.repo.ServiceProviderRepository;

@Service
public class UserService {

    @Autowired
    public ServiceProviderRepository serviceProviderRepository;

    @Autowired
    public ConsumerRepository consumerRepository;

    @Autowired
    public JWTService jwtService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Register Service Provider with password hashing
    public String registerServiceProvider(ServiceProvider provider) {
        Optional<ServiceProvider> exist = serviceProviderRepository.findByEmail(provider.getEmail());
        if (exist.isPresent()) {
            throw new RuntimeException("Service Provider already exists!");
        }
        try {
            provider.setPassword(passwordEncoder.encode(provider.getPassword()));
            serviceProviderRepository.save(provider);
            return "Service Provider registered successfully!";
        } catch (Exception e) {
            throw new RuntimeException("Service Provider registration failed: " + e.getMessage());
        }
    }

    // Register Consumer with password hashing
    public String registerConsumer(Consumer consumer) {
        Optional<Consumer> exist = consumerRepository.findByEmail(consumer.getEmail());
        if (exist.isPresent()) {
            throw new RuntimeException("Email already registered!");
        }
        try {
            consumer.setPassword(passwordEncoder.encode(consumer.getPassword()));
            consumerRepository.save(consumer);
            return "Consumer registered successfully!";
        } catch (Exception e) {
            throw new RuntimeException("Registration failed: " + e.getMessage());
        }
    }

    // Login both - verify password and return JWT token with user data
    public Map<String, Object> loginUser(String email, String password) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<Consumer> consumerOpt = consumerRepository.findByEmail(email);
        if (consumerOpt.isPresent()) {
            Consumer consumer = consumerOpt.get();
            if (passwordEncoder.matches(password, consumer.getPassword())) {
                response.put("token", jwtService.generateToken(email));
                response.put("userData", consumer);
                response.put("role", "consumer");

                return response;
            }
        }

        Optional<ServiceProvider> providerOpt = serviceProviderRepository.findByEmail(email);
        if (providerOpt.isPresent()) {
            ServiceProvider provider = providerOpt.get();
            if (passwordEncoder.matches(password, provider.getPassword())) {
                response.put("token", jwtService.generateToken(email));
                response.put("userData", provider);
                response.put("role", "service-provider");
                return response;
            }
        }

        throw new RuntimeException("Invalid email or password!");
    }

    public Optional<?> getUserByEmail(String email) {
        Optional<Consumer> consumer = consumerRepository.findByEmail(email);
        if (consumer.isPresent()) {
            return Optional.of(consumer.get());
        }

        Optional<ServiceProvider> provider = serviceProviderRepository.findByEmail(email);
        if (provider.isPresent()) {
            return Optional.of(provider.get());
        }

        return Optional.empty();
    }

    public String resetPassword(String email, String oldPassword, String newPassword) {
        // Find service provider by email
        ServiceProvider provider = serviceProviderRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Service provider not found"));

        // Verify old password using BCrypt
        if (!passwordEncoder.matches(oldPassword, provider.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // Hash and update new password
        provider.setPassword(passwordEncoder.encode(newPassword));
        serviceProviderRepository.save(provider);

        return "Password updated successfully";
    }
}
