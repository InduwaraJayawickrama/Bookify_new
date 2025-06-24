package com.example.Book.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Book.model.Schedule;
import com.example.Book.model.ServiceProvider;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    //List<Schedule> findByProvider(ServiceProvider provider);
    List<Schedule> findByProvider(ServiceProvider provider);

}
