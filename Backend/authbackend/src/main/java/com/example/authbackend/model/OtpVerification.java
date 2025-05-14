package com.example.authbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp_verification")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OtpVerification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String phoneNumber;
    
    @Column(nullable = false)
    private String otp;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private LocalDateTime expiresAt;
    
    private LocalDateTime verifiedAt;
    
    @Column(nullable = false)
    private boolean used = false;
    
    // Type can be REGISTRATION, PASSWORD_RESET, etc.
    @Column(nullable = false)
    private String otpType;
    
    // Optional: link to a worker if this is for worker registration
    private Long workerId;
    
    // Constructor with essential fields
    public OtpVerification(String phoneNumber, String otp, String otpType) {
        this.phoneNumber = phoneNumber;
        this.otp = otp;
        this.otpType = otpType;
        this.createdAt = LocalDateTime.now();
        // OTP expires in 10 minutes
        this.expiresAt = LocalDateTime.now().plusMinutes(10);
    }
    
    // Check if OTP is expired
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiresAt);
    }
    
    // Mark OTP as used
    public void markAsUsed() {
        this.used = true;
        this.verifiedAt = LocalDateTime.now();
    }
}
