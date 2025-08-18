package com.example.authbackend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FreeOtpConfig {

    @Value("${free-otp.base-url:http://localhost:3030}")
    private String baseUrl;

    @Value("${free-otp.default-source:ReceiveSmsFree}")
    private String defaultSource;

    @Value("${free-otp.timeout-seconds:60}")
    private int timeoutSeconds;
    
    @Value("${free-otp.fallback-number:+919876543210}")
    private String fallbackNumber;

    public String getBaseUrl() {
        return baseUrl;
    }

    public String getDefaultSource() {
        return defaultSource;
    }

    public int getTimeoutSeconds() {
        return timeoutSeconds;
    }
    
    public String getFallbackNumber() {
        return fallbackNumber;
    }
}
