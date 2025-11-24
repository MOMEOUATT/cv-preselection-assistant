package com.hrift.backend.repository;

import com.hrift.backend.entities.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByRecruiterId(Long recruiter_id);
}
