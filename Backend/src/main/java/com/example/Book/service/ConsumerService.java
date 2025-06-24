package com.example.Book.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Book.model.Consumer;
import com.example.Book.repo.ConsumerRepository;

@Service
public class ConsumerService {
    @Autowired
    private ConsumerRepository consumerRepository;
    
    public Consumer registerConsumer(Consumer consumer) {
        // Don't set the ID here
        return consumerRepository.save(consumer);
    }
}