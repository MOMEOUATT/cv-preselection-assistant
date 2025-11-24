package com.hrift.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class UserProfileDTO {

    private long id;
    private String name;
    private String email;
    private String role;
    private String company;
}
