package com.hrift.backend.mapper;

import com.hrift.backend.dto.ApplicationDTO;
import com.hrift.backend.entities.Application;

import java.util.List;
import java.util.stream.Collectors;

public class ApplicationMapper {

    public static ApplicationDTO toDTO(Application app) {
        if (app == null) return null;

        return new ApplicationDTO(
                app.getId(),
                app.getOffer().getId(),
                app.getFirstName(),
                app.getLastName(),
                app.getPhone(),
                app.getDisponibility(),
                app.getExp(),
                app.getScore(),
                app.getCreatedAt()
        );
    }

    public static List<ApplicationDTO> toDTOList(List<Application> apps) {
        return apps.stream().map(ApplicationMapper::toDTO).collect(Collectors.toList());
    }
}
