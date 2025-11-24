package com.hrift.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class CandidateProfile {


    // Getters et setters
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String domain; // exemple: Informatique

    // Compétences principales
    @ElementCollection
    private List<String> skills;

    // Langues avec niveaux (ex: Français -> B2)
    @ElementCollection
    @CollectionTable(name = "candidate_languages")
    @MapKeyColumn(name = "language")
    @Column(name = "level")
    private Map<String, String> languages;

    // Éducation (ex: Master, Licence, etc.)
    @ElementCollection
    private List<String> education;

    // Expériences (projets, stages, autres)
    @ElementCollection
    @CollectionTable(name = "candidate_experiences")
    @MapKeyColumn(name = "type") // clés: "projets", "stages", "autres"
    @Column(name = "experiences")
    @Transient // ⚠️ à remplacer si tu veux sauvegarder en BDD (ex: JSON ou table séparée)
    private  List<Experience> experiences;

}
