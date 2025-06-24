package com.example.Book.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Book.dto.MessageResponse;
import com.example.Book.dto.PasswordResetRequest;
import com.example.Book.model.Consumer;
import com.example.Book.model.ServiceProvider;
import com.example.Book.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // Register Service Provider
    @PostMapping("/service-provider/register")
    public ResponseEntity<String> registerProvider(@RequestBody ServiceProvider provider) {
        try {
            String result = userService.registerServiceProvider(provider);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    // Register Consumer
    @PostMapping("/consumer/register")
    public ResponseEntity<String> registerConsumer(@RequestBody Consumer consumer) {
        try {
            String result = userService.registerConsumer(consumer);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    // Login for both Service Provider and Consumer
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");
            Map<String, Object> response = userService.loginUser(email, password);

            // Format the response to match frontend expectations
            Map<String, Object> formattedResponse = new HashMap<>();
            formattedResponse.put("token", "Bearer " + response.get("token"));
            formattedResponse.put("user", response.get("userData"));
            formattedResponse.put("role", response.get("role"));
            formattedResponse.put("client_id", response.get("client_id"));

            return ResponseEntity.ok(formattedResponse);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(401).body(errorResponse);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<MessageResponse> resetPassword(@RequestBody PasswordResetRequest request) {
        try {
            String result = userService.resetPassword(request.getEmail(), request.getOldPassword(), request.getNewPassword());
            return ResponseEntity.ok(new MessageResponse(result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

}
