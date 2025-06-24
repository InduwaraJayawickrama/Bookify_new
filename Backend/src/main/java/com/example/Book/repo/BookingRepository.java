package com.example.Book.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.Book.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.bookingId = :bookingId AND b.consumer.client_id = :clientId")
    boolean existsByBookingIdAndConsumerClientId(@Param("bookingId") Long bookingId, @Param("clientId") Long clientId);
}