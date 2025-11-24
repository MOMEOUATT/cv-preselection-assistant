package com.hrift.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
public class OfferRequestDTO {
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
}
