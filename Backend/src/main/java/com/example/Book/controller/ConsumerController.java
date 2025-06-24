package com.example.Book.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Book.model.Consumer;
import com.example.Book.repo.ConsumerRepository;

@RestController
@RequestMapping("/api/consumer")
@CrossOrigin(origins = "http://localhost:3000")
public class ConsumerController {

    @Autowired
    private ConsumerRepository consumerRepository;

    // Get consumer by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getConsumerById(@PathVariable Long id) {
        try {
            Optional<Consumer> consumer = consumerRepository.findById(id);
            
            if (consumer.isPresent()) {
                return ResponseEntity.ok(consumer.get());
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Consumer not found with id: " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving consumer: " + e.getMessage());
        }
    }

    // Get consumer by username
    @GetMapping("/username/{username}")
    public ResponseEntity<?> getConsumerByUsername(@PathVariable String username) {
        try {
            Optional<Consumer> consumer = consumerRepository.findByUsername(username);
            
            if (consumer.isPresent()) {
                return ResponseEntity.ok(consumer.get());
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Consumer not found with username: " + username);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving consumer: " + e.getMessage());
        }
    }

    // Get currently authenticated consumer
    @GetMapping("/current")
    public ResponseEntity<?> getCurrentConsumer() {
        try {
            // In a real application, you would get the authenticated user from SecurityContext
            // For demo purposes, we'll return a 401 - You should implement actual authentication
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Authentication required");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving current consumer: " + e.getMessage());
        }
    }

    // Update consumer
    @PutMapping("/{id}")
    public ResponseEntity<?> updateConsumer(@PathVariable Long id, @RequestBody Consumer consumerDetails) {
        try {
            Optional<Consumer> consumerOpt = consumerRepository.findById(id);
            
            if (consumerOpt.isPresent()) {
                Consumer consumer = consumerOpt.get();
                
                // Update fields if provided in the request
                if (consumerDetails.getUsername() != null) {
                    consumer.setUsername(consumerDetails.getUsername());
                }
                
                if (consumerDetails.getEmail() != null) {
                    consumer.setEmail(consumerDetails.getEmail());
                }
                
                if (consumerDetails.getPhone() != null) {
                    consumer.setPhone(consumerDetails.getPhone());
                }
                
                if (consumerDetails.getAddress() != null) {
                    consumer.setAddress(consumerDetails.getAddress());
                }
                
                if (consumerDetails.getStatus() != null) {
                    consumer.setStatus(consumerDetails.getStatus());
                }
                
                if (consumerDetails.getNotes() != null) {
                    consumer.setNotes(consumerDetails.getNotes());
                }
                
                // Don't update password from this endpoint for security reasons
                
                Consumer updatedConsumer = consumerRepository.save(consumer);
                return ResponseEntity.ok(updatedConsumer);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Consumer not found with id: " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating consumer: " + e.getMessage());
        }
    }
}