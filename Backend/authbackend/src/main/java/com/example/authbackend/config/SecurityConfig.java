package com.example.authbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

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
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .requestMatchers(
                "/api/auth/**",          // All auth endpoints
                "/api/user/**",          // All user endpoints
                "/api/worker/**",         // All worker endpoints, including registration
                "/api/otp/**",           // All OTP endpoints
                "/auth/otp/**"           // Additional OTP endpoints  
            ).permitAll()
            .anyRequest().authenticated()
        );
    return http.build();
    }
}