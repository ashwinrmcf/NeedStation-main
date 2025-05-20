package com.example.authbackend.config;

import com.example.authbackend.security.OtpSecurityFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Autowired
    private OtpSecurityFilter otpSecurityFilter;

    @Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf().disable()
        .cors(cors -> cors
            .configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowCredentials(false); // Change to false to support wildcard * origins
                config.addAllowedOrigin("*"); // Allow all origins
                config.addAllowedMethod("*"); // Allow all methods
                config.addAllowedHeader("*"); // Allow all headers
                return config;
            })
        )
        // Add our custom OTP security filter
        .addFilterBefore(otpSecurityFilter, BasicAuthenticationFilter.class)
        // TEMPORARY: Permit all requests for testing
        .authorizeHttpRequests(auth -> auth
            .anyRequest().permitAll()
        );
    return http.build();
    }
}