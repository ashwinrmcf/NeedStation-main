package com.example.authbackend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "worker")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Worker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate dob;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false, unique = true)
    private String phone;

    private String familyPhone;
    private String address;
    private String currentAddress;

    @Column(nullable = true)
    private String aadhaar;

    private String verification;
    private String category;

    @Column(nullable = false)
    private String experience;  // ✅ Change from int → String (because frontend sends string)

    private String bankAccount;  // ✅ New
    private String ifsc;          // ✅ New
    private String upi;           // ✅ New

    private String emergencyContact;
}





