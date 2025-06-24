package com.example.Book.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadService {
    
    private final String uploadDir = "uploads/profile-images/";
    
    public FileUploadService() {
        // Create upload directory if it doesn't exist
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory!", e);
        }
    }

    public String uploadFile(MultipartFile file) throws IOException {
        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String newFilename = UUID.randomUUID().toString() + extension;
        
        // Save file
        Path filePath = Paths.get(uploadDir + newFilename);
        Files.copy(file.getInputStream(), filePath);
        
        // Return the URL to access the file
        return "/uploads/profile-images/" + newFilename;
    }
} 