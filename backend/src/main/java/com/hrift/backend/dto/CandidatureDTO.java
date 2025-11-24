package com.hrift.backend.dto;

import com.hrift.backend.entities.Candidature;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CandidatureDTO {

    private String offerTitle;
    private String offerLocation;
    private String offerEnterprise;
    private long exp;
    private String cvName;
    private double score;
    private List<String> cvSkills;
    private String createdAt;

    public CandidatureDTO(String offerTitle, String offerLocation, String offerEnterprise,
                          long exp, String cvName, double score, List<String> cvSkills,
                          LocalDateTime createdAt) {
        this.offerTitle = offerTitle;
        this.offerLocation = offerLocation;
        this.offerEnterprise = offerEnterprise;
        this.exp = exp;
        this.cvName = cvName;
        this.score = score;
        this.cvSkills = cvSkills;
        this.createdAt = createdAt.toLocalDate().toString();
    }


}
