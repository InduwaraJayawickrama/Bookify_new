package com.example.Book.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Book.model.ServiceProvider;
import com.example.Book.model.Services;

@Repository
public interface ServiceRepository extends JpaRepository<Services, Integer> {
    List<Services> findByProvider(ServiceProvider provider);
}