package com.example.authbackend.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud-name}")
    private String cloudName;

    @Value("${cloudinary.api-key}")
    private String apiKey;

    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    @Bean
    public Cloudinary cloudinary() {
        // Validate configuration
        if (cloudName == null || cloudName.trim().isEmpty()) {
            System.err.println("ERROR: Cloudinary cloud_name is not configured");
        }
        if (apiKey == null || apiKey.trim().isEmpty()) {
            System.err.println("ERROR: Cloudinary api_key is not configured");
        }
        if (apiSecret == null || apiSecret.trim().isEmpty()) {
            System.err.println("ERROR: Cloudinary api_secret is not configured");
        }
        
        System.out.println("Configuring Cloudinary with cloud_name: " + cloudName);
        System.out.println("API Key configured: " + (apiKey != null && !apiKey.trim().isEmpty()));
        System.out.println("API Secret configured: " + (apiSecret != null && !apiSecret.trim().isEmpty()));
        
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }
}



