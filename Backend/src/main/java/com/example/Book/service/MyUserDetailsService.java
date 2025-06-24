package com.example.Book.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.Book.model.Consumer;
import com.example.Book.model.ServiceProvider;
import com.example.Book.repo.ConsumerRepository;
import com.example.Book.repo.ServiceProviderRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private ConsumerRepository consumerRepository;

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Consumer> consumer = consumerRepository.findByEmail(email);
        if (consumer.isPresent()) {
            Consumer cons = consumer.get();
            return User.builder()
                    .username(cons.getEmail())
                    .password(cons.getPassword())
                    .roles("CONSUMER")
                    .build();
        }

        Optional<ServiceProvider> provider = serviceProviderRepository.findByEmail(email);
        if (provider.isPresent()) {
            ServiceProvider sp = provider.get();
            return User.builder()
                    .username(sp.getEmail())
                    .password(sp.getPassword())
                    .roles("SERVICE_PROVIDER")
                    .build();
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
