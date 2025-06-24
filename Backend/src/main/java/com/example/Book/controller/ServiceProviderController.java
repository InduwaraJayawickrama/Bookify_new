package com.example.Book.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Book.model.ServiceProvider;
import com.example.Book.repo.ServiceProviderRepository;
import com.example.Book.service.JWTService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/service-providers")
public class ServiceProviderController {

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    @Autowired
    private JWTService jwtService;

    @GetMapping("/profile")
    public ResponseEntity<?> getServiceProviderProfile(@RequestHeader("Authorization") String token) {
        try {
            if (token == null || token.isEmpty()) {
                return ResponseEntity.status(401).body("No authorization token provided");
            }

            // Remove "Bearer " prefix if present
            String actualToken = token.startsWith("Bearer ") ? token.substring(7) : token;
            
            // Extract email from token
            String userEmail = jwtService.extractUserName(actualToken);
            if (userEmail == null || userEmail.isEmpty()) {
                return ResponseEntity.status(401).body("Invalid token: Could not extract email");
            }
            
            System.out.println("Fetching profile for email: " + userEmail);
            
            // Find service provider by email
            Optional<ServiceProvider> provider = serviceProviderRepository.findByEmail(userEmail);
            
            if (provider.isPresent()) {
                ServiceProvider sp = provider.get();
                Map<String, Object> response = Map.of(
                    "username", sp.getUsername() != null ? sp.getUsername() : "",
                    "email", sp.getEmail() != null ? sp.getEmail() : "",
                    "address", sp.getAddress() != null ? sp.getAddress() : "",
                    "contact", sp.getContact() != null ? sp.getContact() : "",
                    "experience", sp.getExperience() != null ? sp.getExperience() : 0,
                    "isActive", sp.getIsActive() != null ? sp.getIsActive() : false,
                    "firstName", sp.getFirstName() != null ? sp.getFirstName() : "",
                    "lastName", sp.getLastName() != null ? sp.getLastName() : "",
                    "bio", sp.getBio() != null ? sp.getBio() : "",
                    "profileImage", sp.getProfileImage() != null ? sp.getProfileImage() : ""
                );
                System.out.println("Found provider profile: " + response);
                return ResponseEntity.ok(response);
            }
            
            System.out.println("No provider found for email: " + userEmail);
            return ResponseEntity.status(404).body("Service provider not found");
        } catch (Exception e) {
            System.err.println("Error in getServiceProviderProfile: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateServiceProviderProfile(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, Object> profileData) {
        try {
            System.out.println("Received profile update request with data: " + profileData);
            
            if (token == null || token.isEmpty()) {
                System.out.println("No authorization token provided");
                return ResponseEntity.status(401).body("No authorization token provided");
            }

            // Remove "Bearer " prefix if present
            String actualToken = token.startsWith("Bearer ") ? token.substring(7) : token;
            System.out.println("Processing token: " + actualToken.substring(0, Math.min(actualToken.length(), 10)) + "...");
            
            // Extract email from token
            String userEmail = jwtService.extractUserName(actualToken);
            System.out.println("Extracted email from token: " + userEmail);
            
            if (userEmail == null || userEmail.isEmpty()) {
                System.out.println("Invalid token: Could not extract email");
                return ResponseEntity.status(401).body("Invalid token: Could not extract email");
            }

            // Find service provider by email
            Optional<ServiceProvider> providerOpt = serviceProviderRepository.findByEmail(userEmail);
            if (!providerOpt.isPresent()) {
                System.out.println("Service provider not found for email: " + userEmail);
                return ResponseEntity.status(404).body("Service provider not found");
            }

            ServiceProvider provider = providerOpt.get();
            System.out.println("Found provider with ID: " + provider.getProvider_id());

            // Update fields if they exist in the request
            try {
                if (profileData.containsKey("username")) {
                    provider.setUsername((String) profileData.get("username"));
                }
                if (profileData.containsKey("address")) {
                    provider.setAddress((String) profileData.get("address"));
                }
                if (profileData.containsKey("contact")) {
                    provider.setContact((String) profileData.get("contact"));
                }
                if (profileData.containsKey("firstName")) {
                    provider.setFirstName((String) profileData.get("firstName"));
                }
                if (profileData.containsKey("lastName")) {
                    provider.setLastName((String) profileData.get("lastName"));
                }
                if (profileData.containsKey("bio")) {
                    provider.setBio((String) profileData.get("bio"));
                }
                if (profileData.containsKey("profileImage")) {
                    provider.setProfileImage((String) profileData.get("profileImage"));
                }
                if (profileData.containsKey("experience")) {
                    Object expObj = profileData.get("experience");
                    if (expObj != null) {
                        if (expObj instanceof Integer) {
                            provider.setExperience((Integer) expObj);
                        } else {
                            try {
                                provider.setExperience(Integer.parseInt(expObj.toString()));
                            } catch (NumberFormatException e) {
                                System.out.println("Invalid experience value: " + expObj);
                                provider.setExperience(0);
                            }
                        }
                    }
                }
                if (profileData.containsKey("isActive")) {
                    Object activeObj = profileData.get("isActive");
                    if (activeObj != null) {
                        if (activeObj instanceof Boolean) {
                            provider.setIsActive((Boolean) activeObj);
                        } else {
                            provider.setIsActive(Boolean.parseBoolean(activeObj.toString()));
                        }
                    }
                }

                // Save the updated provider
                System.out.println("Attempting to save updated provider data");
                ServiceProvider updatedProvider = serviceProviderRepository.save(provider);
                System.out.println("Successfully saved provider data");

                // Return the updated profile
                Map<String, Object> response = Map.of(
                    "username", updatedProvider.getUsername() != null ? updatedProvider.getUsername() : "",
                    "email", updatedProvider.getEmail() != null ? updatedProvider.getEmail() : "",
                    "address", updatedProvider.getAddress() != null ? updatedProvider.getAddress() : "",
                    "contact", updatedProvider.getContact() != null ? updatedProvider.getContact() : "",
                    "experience", updatedProvider.getExperience() != null ? updatedProvider.getExperience() : 0,
                    "isActive", updatedProvider.getIsActive() != null ? updatedProvider.getIsActive() : false,
                    "firstName", updatedProvider.getFirstName() != null ? updatedProvider.getFirstName() : "",
                    "lastName", updatedProvider.getLastName() != null ? updatedProvider.getLastName() : "",
                    "bio", updatedProvider.getBio() != null ? updatedProvider.getBio() : "",
                    "profileImage", updatedProvider.getProfileImage() != null ? updatedProvider.getProfileImage() : ""
                );

                System.out.println("Returning updated profile: " + response);
                return ResponseEntity.ok(response);
            } catch (Exception e) {
                System.err.println("Error updating provider fields: " + e.getMessage());
                e.printStackTrace();
                return ResponseEntity.status(400).body("Error updating provider fields: " + e.getMessage());
            }
        } catch (Exception e) {
            System.err.println("Error in updateServiceProviderProfile: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }
} 