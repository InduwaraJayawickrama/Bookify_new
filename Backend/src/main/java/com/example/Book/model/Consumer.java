package com.example.Book.model;

import org.springframework.web.bind.annotation.CrossOrigin;

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
@Setter
@Getter
@Table(name = "consumers")
@NoArgsConstructor
@AllArgsConstructor
public class Consumer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long client_id;

    private String username;

    private String email;

    private String phone;
    private String address;
    private String status;

    private String password;

    private String notes;

    public Long getClientId() {
        return client_id;
    }
}