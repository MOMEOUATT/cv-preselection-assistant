package com.hrift.backend.service;

import com.hrift.backend.dto.OfferRequestDTO;
import com.hrift.backend.dto.OfferResponseDTO;
import com.hrift.backend.entities.Offer;
import com.hrift.backend.entities.User;
import com.hrift.backend.repository.OfferRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    private final OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository){

        this.offerRepository = offerRepository;
    }

    public Offer createOffers(Offer offer){

        return offerRepository.save(offer);
    }

    public Offer createOfferFromDTO(OfferRequestDTO dto, User recruiter) {
        Offer offer = new Offer();
        offer.setTitle(dto.getTitle());
        offer.setEnterprise(dto.getEnterprise());
        offer.setLocation(dto.getLocation());
        offer.setDescription(dto.getDescription());
        offer.setType(dto.getType());
        offer.setDuration(dto.getDuration());
        offer.setDeadline(dto.getDeadline());
        offer.setEducation(dto.getEducation());
        offer.setExp(dto.getExp());
        offer.setSkills(dto.getSkills());
        offer.setLanguage(dto.getLanguage());
        offer.setMin_salary(dto.getMin_salary());
        offer.setMax_salary(dto.getMax_salary());
        offer.setRecruiter(recruiter);
        return offerRepository.save(offer);
    }

    public OfferResponseDTO convertToResponseDTO(Offer offer) {
        OfferResponseDTO dto = new OfferResponseDTO();
        dto.setId(offer.getId());
        dto.setTitle(offer.getTitle());
        dto.setEnterprise(offer.getEnterprise());
        dto.setLocation(offer.getLocation());
        dto.setDescription(offer.getDescription());
        dto.setType(offer.getType());
        dto.setDuration(offer.getDuration());
        dto.setDeadline(offer.getDeadline());
        dto.setEducation(offer.getEducation());
        dto.setExp(offer.getExp());
        dto.setSkills(offer.getSkills());
        dto.setLanguage(offer.getLanguage());
        dto.setMin_salary(offer.getMin_salary());
        dto.setMax_salary(offer.getMax_salary());
        if (offer.getRecruiter() != null) {
            dto.setRecruiterName(offer.getRecruiter().getName());
        } else {
            dto.setRecruiterName("Non attribué");
        }

        dto.setCreatedAt(offer.getCreatedAt());
        dto.setUpdatedAt(offer.getUpdatedAt());
        return dto;

    }

    public List<Offer> getAllOffers(){

        return offerRepository.findAll();
    }

    public Optional<Offer> getOfferById(Long id){

        return offerRepository.findById(id);
    }
    public List<Offer> getOffersByRecruiter(Long recruiterId) {
        return offerRepository.findByRecruiterId(recruiterId);
    }

    public Offer updateOffer(Long id, Offer offer){

        return offerRepository.findById(id).map(updatedOffer -> {
            updatedOffer.setTitle(offer.getTitle());
            updatedOffer.setEnterprise(offer.getEnterprise());
            updatedOffer.setLocation(offer.getLocation());
            updatedOffer.setType(offer.getType());
            updatedOffer.setDescription(offer.getDescription());
            updatedOffer.setDeadline(offer.getDeadline());
            updatedOffer.setDuration(offer.getDuration());
            updatedOffer.setExp(offer.getExp());
            updatedOffer.setEducation(offer.getEducation());
            updatedOffer.setMin_salary(offer.getMin_salary());
            updatedOffer.setMax_salary(offer.getMax_salary());
            updatedOffer.setSkills(offer.getSkills());
            updatedOffer.setLanguage(offer.getLanguage());
            updatedOffer.setUpdatedAt(offer.getUpdatedAt());

            return  offerRepository.save(updatedOffer);
        }).orElseThrow(() -> new RuntimeException("Offre non trouvée avec l'id: " + id));
    }

    public void deleteOffer(Long id){
        if(!offerRepository.existsById(id)){
            throw new RuntimeException("Offre non trouvée avec l'id: " + id);
        }
        offerRepository.deleteById(id);
    }

}
