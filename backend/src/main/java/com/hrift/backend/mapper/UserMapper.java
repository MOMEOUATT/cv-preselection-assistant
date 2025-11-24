package com.hrift.backend.mapper;

import com.hrift.backend.dto.UserProfileDTO;
import com.hrift.backend.entities.User;

public class UserMapper {

    public static UserProfileDTO toProfileDTO(User user){
        if(user == null){
            return null;
        }

        return new UserProfileDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.getCompany() != null ? user.getCompany() : ""
        );
    }
}
