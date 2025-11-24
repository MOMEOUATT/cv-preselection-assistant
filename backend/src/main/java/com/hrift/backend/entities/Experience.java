package com.hrift.backend.entities;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Embeddable
public class Experience {

    private String title;       // Stage, Projet, Expérience pro
    private String description; // Détails du projet/mission
    private String startDate;   // Exemple: 09/2022
    private String endDate;     // Exemple: 07/2023 ou "présent"

}
