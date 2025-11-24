package com.hrift.backend.controller;

import com.hrift.backend.dto.ApplicationDTO;
import com.hrift.backend.dto.CandidatureDTO;
import com.hrift.backend.entities.Application;
import com.hrift.backend.entities.Candidature;
import com.hrift.backend.entities.User;
import com.hrift.backend.mapper.ApplicationMapper;
import com.hrift.backend.mapper.CandidatureMapper;
import com.hrift.backend.models.ApplicationModel;
import com.hrift.backend.service.ApplicationService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
//@CrossOrigin(origins = "http://localhost:4200")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    @PreAuthorize("hasRole('RH')")
    public ResponseEntity<List<ApplicationDTO>> getAllApplications(){
        List<Application> applications = applicationService.getAllApplications();
        List<ApplicationDTO> applicationDTOList = ApplicationMapper.toDTOList(applications);
        return ResponseEntity.ok(applicationDTOList);
    }

    @PostMapping
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<Application> apply(@RequestPart("data") ApplicationModel model,
                                             @RequestParam("cv") MultipartFile cvFile, Authentication authentication) throws IOException{
        User candidate = (User) authentication.getPrincipal();
        Application application = applicationService.apply(
                model.getOfferId(),
                model.getFirstName(),
                model.getLastName(),
                model.getPhone(),
                model.getDisponibility(),
                model.getExp(),
                cvFile,
                candidate);
        return ResponseEntity.ok(application);
    }

    @PostMapping("/score")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<Double> getScore(@RequestPart("data") ApplicationModel model,
                                          @RequestParam("cv") MultipartFile cvFile) throws IOException{
        double score = applicationService.calculateScore(model.getOfferId(),cvFile, model.getExp());
        return ResponseEntity.ok(score);
    }

    @GetMapping("/candidature")
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('RH')")
    public ResponseEntity<List<CandidatureDTO>> getAllCandidature(){
        List<Candidature> candidatures = applicationService.getAllCandidature();
        List<CandidatureDTO> candidatureDTOList = CandidatureMapper.toDTOList(candidatures);
        return ResponseEntity.ok(candidatureDTOList);
    }

    @GetMapping("/candidature/my")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity <List<Candidature>> getMyCandidature(Authentication authentication){
        User candidate = (User)authentication.getPrincipal();
        List<Candidature> candidatures = applicationService.getCandidaturesForCandidate(candidate.getId());
        return ResponseEntity.ok(candidatures);
    }

    @GetMapping("/{id}/cv")
    @PreAuthorize("hasRole('RH')")
    public ResponseEntity<byte[]> downloadCv(@PathVariable Long id) {
        return applicationService.getApplicationById(id)
                .map(app -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION)
                        .contentType(MediaType.APPLICATION_PDF) // ou détecter dynamiquement
                        .body(app.getCv()))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/recruiter")
    @PreAuthorize("hasRole('RH')")
    public ResponseEntity<List<Application>> getApplications(Authentication auth) {
        User recruiter = (User) auth.getPrincipal();
        return ResponseEntity.ok(applicationService.getApplicationsForRecruiter(recruiter.getId()));
    }
}
