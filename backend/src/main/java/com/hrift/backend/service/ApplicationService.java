package com.hrift.backend.service;

import com.hrift.backend.entities.*;
import com.hrift.backend.repository.ApplicationRepository;
import com.hrift.backend.repository.CandidatureRepository;
import com.hrift.backend.repository.OfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final OfferRepository offerRepository;
    private final CVParserService cvParserService;
    private final CandidatureRepository candidatureRepository;


    public List<Candidature> getAllCandidature(){
        return candidatureRepository.findAll();
    }
    public Optional<Candidature> getCandidatureById(Long id){
        return candidatureRepository.findById(id);
    }

    public Optional<Application> getApplicationById(Long id){

        return applicationRepository.findById(id);
    }
    public List<Application> getApplicationsForRecruiter(Long recruiterId) {
        return applicationRepository.findByRecruiterId(recruiterId);
    }

    public List<Application> getAllApplications(){
        return applicationRepository.findAll();
    }

    public List<Candidature> getCandidaturesForCandidate(Long candidateId){
        return candidatureRepository.findByCandidateId(candidateId);
    }

    public Application apply(Long offerId,
                                String firstName,
                                String lastName,
                                String phone,
                                String disponibility,
                                Long exp,
                                MultipartFile cvFile, User candidate) throws IOException {

        // 1. Récupérer l'offre
        Offer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new RuntimeException("Offre introuvable"));

        // 🔐 Vérification anti-doublon
        boolean alreadyApplied = applicationRepository.existsByFirstNameAndLastNameAndOffer_Id(firstName, lastName, offerId);
        if (alreadyApplied) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Vous avez déjà postulé à cette offre.");
        }


        // 2. Créer la candidature avec les infos du formulaire
        Application application = new Application();
        application.setFirstName(firstName);
        application.setLastName(lastName);
        application.setPhone(phone);
        application.setDisponibility(disponibility);
        application.setCv(cvFile.getBytes());
        application.setOffer(offer);
        application.setExp(exp);
        application.setCandidate(candidate);

        // 3. Sauvegarder pour obtenir un ID
//        application = applicationRepository.save(application);

        // 4. Analyser le CV pour calculer le score
        File tempFile = File.createTempFile("cv_", ".pdf");
        cvFile.transferTo(tempFile);

        CandidateProfile profile = cvParserService.parseCV(tempFile);

        double score = calculerScore(profile, offer, exp);
        application.setScore(score);

        Candidature candidature = new Candidature();
        candidature.setExp(exp);
        candidature.setOfferTitle(offer.getTitle());
        candidature.setOfferLocation(offer.getLocation());
        candidature.setOfferEnterprise(offer.getEnterprise());
        candidature.setScore(score);
        candidature.setCvSkills(profile.getSkills());
        candidature.setCvName(firstName+"_"+lastName+"_cv.pdf");
        candidature.setCandidate(candidate);

        candidatureRepository.save(candidature);

        // 5. Mettre à jour la candidature avec le score
        return applicationRepository.save(application);
    }

    private double calculerScore(CandidateProfile profile, Offer offer, Long exp) {
        String[] offerSkills = offer.getSkills().split("\\s*,\\s*");
        String[] offerLanguages = offer.getLanguage().split("\\s*,\\s*");
        String offerEducation = offer.getEducation().toLowerCase();
        double eduscore = 0;
        double expscore = 0;

        int matchedSkill = (int) Arrays.stream(offerSkills)
                .filter(skill -> profile.getSkills().stream()
                        .anyMatch(s -> s.equalsIgnoreCase(skill)))
                .count();
        double skillscore = (matchedSkill * 50.0) / offerSkills.length;

        int matchedLanguage = (int) Arrays.stream(offerLanguages)
                .filter(lang -> profile.getLanguages().keySet().stream()
                        .anyMatch(l -> l.equalsIgnoreCase(lang)))
                .count();
        double langscore = (matchedLanguage * 10.0) / offerLanguages.length;

        for(String edu: profile.getEducation()){
            if(offerEducation.equals("master")){
                if(edu.toLowerCase().contains("ingénieur")){
                    eduscore = 15;
                    break;
                }
            }
            if(offerEducation.equals("license")){
                if(edu.toLowerCase().contains("ingénieur") || edu.toLowerCase().contains("master")){
                    eduscore = 15;
                }
            }
            if(edu.toLowerCase().contains(offerEducation)){
                eduscore = 15;
            }
        }

        if(exp>=offer.getExp()){
            expscore = 25;
        }

        return skillscore + langscore + eduscore + expscore;
    }

    public double calculateScore(Long offerId, MultipartFile cvFile, Long exp) throws IOException {
        Offer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new RuntimeException("Offre introuvable"));

        File tempFile = File.createTempFile("cv_", ".pdf");
        cvFile.transferTo(tempFile);

        CandidateProfile profile = cvParserService.parseCV(tempFile);

        return calculerScore(profile, offer, exp);
    }
    
}
