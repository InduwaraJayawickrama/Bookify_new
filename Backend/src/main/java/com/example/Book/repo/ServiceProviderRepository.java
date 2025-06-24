package com.example.Book.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Book.model.ServiceProvider;

@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {


    Optional <ServiceProvider> findByEmail(String email);

    Optional<ServiceProvider> findById(Long providerId);
}
