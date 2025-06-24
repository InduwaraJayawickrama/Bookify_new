package com.example.Book.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Book.model.Consumer;
import com.example.Book.model.ServiceProvider;
import com.example.Book.repo.ConsumerRepository;
import com.example.Book.repo.ServiceProviderRepository;
import com.example.Book.service.JWTService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private ConsumerRepository consumerRepository;

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String token) {
        try {
            // Extract email from token
            String userEmail = jwtService.extractUserName(token.replace("Bearer ", ""));
            System.out.println("Extracted Email: " + userEmail);
            
            // Check if user exists in Consumer or Service Provider tables
            Optional<Consumer> consumer = consumerRepository.findByEmail(userEmail);
            if (consumer.isPresent()) {
                return ResponseEntity.ok(Map.of(
                    "username", consumer.get().getUsername(),
                    "role", "consumer",
                     "id", consumer.get().getClientId()
                ));
            }

            Optional<ServiceProvider> provider = serviceProviderRepository.findByEmail(userEmail);
            if (provider.isPresent()) {
                return ResponseEntity.ok(Map.of(
                    "username", provider.get().getUsername(),
                    "role", "service-provider"
                ));
            }

            return ResponseEntity.status(404).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid token");
        }
    }
}
