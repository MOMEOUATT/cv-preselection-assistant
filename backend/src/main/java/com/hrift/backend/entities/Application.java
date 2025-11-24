package com.hrift.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] cv;
    private String phone;
    private String disponibility;

    @ManyToOne
    @JoinColumn(name="Offer_id")
    private Offer offer;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private User candidate;

    private double score;

    private Long exp;

//    @Column(nullable = false)
    private LocalDateTime createdAt;

//    @Column(nullable = false)
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
