package com.hrift.backend.controller;


import com.hrift.backend.entities.Candidate;
import com.hrift.backend.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/candidates")
public class CandidateController {

    @Autowired
    private CandidateRepository candidateRepository;

    @GetMapping
    public List<Candidate> getAllCandidates(){
        return candidateRepository.findAll();
    }

    @PostMapping
    public  Candidate createCandidate(@RequestBody Candidate candidate){
        return candidateRepository.save(candidate);
    }

    @GetMapping("/{id}")
    public Optional<Candidate> getCandidateById(@PathVariable Long id){
        return candidateRepository.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCandidate(@PathVariable Long id){
        candidateRepository.deleteById(id);
    }
}
