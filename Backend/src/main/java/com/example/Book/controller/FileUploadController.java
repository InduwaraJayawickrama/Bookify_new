package com.example.Book.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.Book.service.FileUploadService;
import com.example.Book.service.JWTService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/profile-image")
    public ResponseEntity<?> uploadProfileImage(
            @RequestHeader("Authorization") String token,
            @RequestParam("file") MultipartFile file) {
        try {
            logger.info("Received file upload request with token: {}", token.substring(0, Math.min(token.length(), 20)) + "...");
            
            // Validate token
            if (token == null || token.isEmpty()) {
                logger.error("No token provided");
                return ResponseEntity.status(401).body("No token provided");
            }

            if (!token.startsWith("Bearer ")) {
                logger.error("Invalid token format - missing Bearer prefix");
                return ResponseEntity.status(401).body("Invalid token format - missing Bearer prefix");
            }

            String actualToken = token.substring(7); // Remove "Bearer " prefix
            String email = jwtService.extractUserName(actualToken);
            
            if (email == null) {
                logger.error("Failed to extract email from token");
                return ResponseEntity.status(401).body("Invalid token - could not extract user information");
            }

            logger.info("Token validated for user: {}", email);

            String imageUrl = fileUploadService.uploadFile(file);
            logger.info("File uploaded successfully for user: {}", email);
            return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
        } catch (Exception e) {
            logger.error("Error during file upload: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Failed to upload image: " + e.getMessage());
        }
    }
} 