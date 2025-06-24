package com.example.Book.model;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@CrossOrigin(origins = "http://localhost:3000")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "service_provider")
public class ServiceProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long provider_id;

    private String username;
    private String email;
    private String password;
    private String address;
    private String contact;
    private Integer experience;
    private Boolean isActive;
    private String firstName;
    private String lastName;
    private String bio;
    
    @Column(columnDefinition = "TEXT")
    private String profileImage;
}
