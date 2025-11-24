package com.hrift.backend.controller;

import com.hrift.backend.dto.OfferRequestDTO;
import com.hrift.backend.dto.OfferResponseDTO;
import com.hrift.backend.entities.Offer;
import com.hrift.backend.entities.User;
import com.hrift.backend.service.OfferService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
//@CrossOrigin(origins = "http://localhost:4200/")
public class OfferController {

    private final OfferService offerService;

    public OfferController(OfferService offerService){

        this.offerService = offerService;
    }

    @PostMapping
    @PreAuthorize("hasRole('RH')")
    public ResponseEntity<OfferResponseDTO> createOffer(@RequestBody OfferRequestDTO dto, Authentication authentication) {
        User recruiter = (User) authentication.getPrincipal();
        Offer savedOffer = offerService.createOfferFromDTO(dto, recruiter);
        OfferResponseDTO response = offerService.convertToResponseDTO(savedOffer);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('RH')")
    public ResponseEntity<List<OfferResponseDTO>> getAllOffers() {
        List<Offer> offers = offerService.getAllOffers();
        List<OfferResponseDTO> responseList = offers.stream()
                .map(offerService::convertToResponseDTO)
                .toList();
        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('RH')")
    public ResponseEntity<OfferResponseDTO> getOfferById(@PathVariable Long id) {
        return offerService.getOfferById(id)
                .map(offerService::convertToResponseDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('RH')")
    public ResponseEntity<Offer> updateOffer(@PathVariable Long id, @RequestBody Offer offer){
        Offer updatedOffer = offerService.updateOffer(id, offer);
        return ResponseEntity.ok(updatedOffer);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('RH')")
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id){
        offerService.deleteOffer(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('RH')")
    public ResponseEntity<List<OfferResponseDTO>> getMyOffers(Authentication auth) {
        User recruiter = (User) auth.getPrincipal();
        List<Offer> offers = offerService.getOffersByRecruiter(recruiter.getId());
        List<OfferResponseDTO> responseList = offers.stream()
                .map(offerService::convertToResponseDTO)
                .toList();
        return ResponseEntity.ok(responseList);
    }

}
