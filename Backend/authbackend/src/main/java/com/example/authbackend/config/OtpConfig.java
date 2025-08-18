//package com.example.authbackend.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class OtpConfig {
//
//    @Value("${otp.api.key}")
//    private String apiKey;
//
//    @Value("${otp.api.token}")
//    private String apiToken;
//
//    // Make sure the URL ends with a trailing slash as specified in the documentation
//    @Value("${otp.api.endpoint:https://otp.dev/api/verify/}")
//    private String apiEndpoint;
//
//    @Value("${app.base.url:http://localhost:8080}")
//    private String baseUrl;
//
//    public String getApiKey() {
//        return apiKey;
//    }
//
//    public String getApiToken() {
//        return apiToken;
//    }
//
//    public String getApiEndpoint() {
//        // Ensure the API endpoint ends with a trailing slash
//        if (!apiEndpoint.endsWith("/")) {
//            return apiEndpoint + "/";
//        }
//        return apiEndpoint;
//    }
//
//    public String getSuccessRedirectUrl() {
//        return baseUrl + "/api/otp/success";
//    }
//
//    public String getFailRedirectUrl() {
//        return baseUrl + "/api/otp/fail";
//    }
//
//    public String getCallbackUrl() {
//        return baseUrl + "/api/otp/callback";
//    }
//}