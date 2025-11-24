package com.hrift.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(nullable = false)
    private String offerTitle;

    @Column(nullable = false)
    private String offerLocation;

    @Column(nullable = false)
    private String offerEnterprise;

    @Column(nullable = false)
    private long exp;

    @Column(nullable = false)
    private String cvName;

    @Column(nullable = false)
    private double score;

    @Column(nullable = false)
    private List<String> cvSkills;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private User candidate;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;


    @PrePersist
    public void prePersist(){
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    public void preUpdate(){
        this.updatedAt = LocalDateTime.now();
    }
}
