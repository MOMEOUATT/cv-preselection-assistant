package com.hrift.backend.repository;

import com.hrift.backend.entities.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    @Query("SELECT a FROM Application a WHERE a.offer.recruiter.id = :recruiterId")
    List<Application> findByRecruiterId(@Param("recruiterId") Long recruiterId);

    boolean existsByFirstNameAndLastNameAndOffer_Id(String firstName, String lastName, Long offerId);
}
