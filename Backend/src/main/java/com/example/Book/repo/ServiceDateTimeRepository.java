package com.example.Book.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.Book.dto.ServiceDateTimeDTO;
import com.example.Book.model.ServiceDateTime;
import com.example.Book.model.Services;

@Repository
public interface ServiceDateTimeRepository extends JpaRepository<ServiceDateTime, Long> {

    @Query("SELECT new com.example.Book.dto.ServiceDateTimeDTO(sdt.serviceDateTimeId, sdt.workHoursStart, sdt.workHoursEnd, sdt.timePackages, sdt.workingDays) " +
            "FROM ServiceDateTime sdt " +
            "JOIN sdt.services srv " +
            "JOIN srv.provider sp " +
            "WHERE sp.provider_id = :providerId")
    List<ServiceDateTimeDTO> findByProviderId(@Param("providerId") Long providerId);

    Optional<ServiceDateTime> findByServices(Services services);
}
