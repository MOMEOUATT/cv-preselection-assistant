package com.hrift.backend.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "offers")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String enterprise;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String type;

    private String duration;

    @Column(nullable = false)
    private LocalDate deadline;

    @Column(nullable = false)
    private String education;

    @Column(nullable = true)
    private int exp;

    @Column(nullable = false)
    private String skills;

    @Column(nullable = false)
    private String language;

    @Column(nullable = true)
    private double min_salary;

    @Column(nullable = true)
    private double max_salary;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User recruiter;

    @OneToMany(mappedBy = "offer")
    private List<Application> applications;

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

    public Offer() {
    }

    public Offer(String title, String enterprise, String location, String description, String type, String duration, LocalDate deadline, String education, int exp, String skills, String language, double min_salary, double max_salary) {
        this.title = title;
        this.enterprise = enterprise;
        this.location = location;
        this.description = description;
        this.type = type;
        this.duration = duration;
        this.deadline = deadline;
        this.education = education;
        this.exp = exp;
        this.skills = skills;
        this.language = language;
        this.min_salary = min_salary;
        this.max_salary = max_salary;
    }

}
