package com.hrift.backend.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class OfferResponseDTO {
    private long id;
    private String title;
    private String enterprise;
    private String location;
    private String description;
    private String type;
    private String duration;
    private LocalDate deadline;
    private String education;
    private int exp;
    private String skills;
    private String language;
    private double min_salary;
    private double max_salary;
    private String recruiterName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
