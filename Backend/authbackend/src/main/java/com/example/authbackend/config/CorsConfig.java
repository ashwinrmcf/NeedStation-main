//package com.example.authbackend.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//@EnableWebMvc
//public class CorsConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/api/**")  // ✅ Allow all /api/ routes
//                .allowedOrigins("http://localhost:5173")  // ✅ Allow frontend
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // ✅ Support preflight requests
//                .allowedHeaders("*")  // ✅ Allow all headers
//                .allowCredentials(true);
//    }
//}

