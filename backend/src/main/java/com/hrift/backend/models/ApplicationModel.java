package com.hrift.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.context.annotation.Bean;

@Data
public class ApplicationModel {

   private Long offerId;
//    private String skills;
//    private String cvFileName;
    private Long exp;

    private String FirstName;
    private String LastName;
    private String phone;
    private String disponibility;

}
