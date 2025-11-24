package com.hrift.backend.repository;

import com.hrift.backend.entities.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {

    List<Candidature> findByCandidateId(Long candidateId);
}
