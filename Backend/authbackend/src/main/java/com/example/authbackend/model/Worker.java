package com.example.authbackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "worker")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Worker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)  // Ensure this is provided in request
    private String fullName;

    @Column(nullable = false)
    private String dob;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false, unique = true)  // Phone should be unique
    private String phone;

    private String familyPhone;
    private String address;
    private String currentAddress;

    @Column(nullable = false, unique = true)  // Aadhaar should be unique
    private String aadhaar;

    private String verification;
    private String category;

    @Column(nullable = false)
    private int experience;

    private String emergencyContact;
    private String emergencyPhone;
}





