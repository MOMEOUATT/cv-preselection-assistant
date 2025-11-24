package com.hrift.backend.dto;

import com.hrift.backend.entities.User;
import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String fullName;
    private String password;
    private User.Role role;
    private String company;
}
