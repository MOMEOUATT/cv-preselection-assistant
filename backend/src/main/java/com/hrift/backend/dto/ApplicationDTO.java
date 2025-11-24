package com.hrift.backend.dto;

import com.hrift.backend.entities.Application;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class ApplicationDTO {

    private Long id;
    private Long offerId;
    private String firstName;
    private String lastName;
    private String phone;
    private String disponibility;
    private Long exp;
    private double score;
    private String createdAt;


    public ApplicationDTO(Long id, Long offerId,
                          String firstName, String lastName, String phone, String disponibility,
                          Long exp, double score, LocalDateTime createdAt) {
        this.id = id;
        this.offerId = offerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.disponibility = disponibility;
        this.exp = exp;
        this.score = score;
        this.createdAt = (createdAt != null) ? createdAt.toLocalDate().toString() : "Date inconnue";
    }


}
