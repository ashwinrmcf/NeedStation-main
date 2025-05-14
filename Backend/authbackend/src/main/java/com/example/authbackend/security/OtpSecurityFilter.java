package com.example.authbackend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Security filter that protects OTP endpoints from abuse
 */
@Component
public class OtpSecurityFilter extends OncePerRequestFilter {

    private final RateLimiter rateLimiter;
    private final ObjectMapper objectMapper;

    @Autowired
    public OtpSecurityFilter(RateLimiter rateLimiter, ObjectMapper objectMapper) {
        this.rateLimiter = rateLimiter;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String path = request.getRequestURI();
        
        // Only apply to OTP-related endpoints
        if (path.startsWith("/api/free-otp") || path.contains("/otp") || path.contains("/verify")) {
            // Get client IP address - handle proxies properly
            String clientIp = getClientIpAddress(request);
            
            // Check if the client IP is rate-limited
            if (rateLimiter.isIpLimited(clientIp)) {
                // IP is rate-limited, return 429 Too Many Requests
                response.setStatus(429); // HTTP 429 Too Many Requests
                response.setContentType("application/json");
                
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("status", "error");
                errorResponse.put("message", "Rate limit exceeded. Please try again later.");
                errorResponse.put("remainingAttempts", 0);
                
                objectMapper.writeValue(response.getOutputStream(), errorResponse);
                return;
            }
            
            // For phone-specific endpoints, also check phone rate limits
            if (path.contains("/phone/") || path.contains("/listen/")) {
                String phoneNumber = extractPhoneNumber(path);
                if (phoneNumber != null && rateLimiter.isPhoneLimited(phoneNumber)) {
                    // Phone is rate-limited, return 429 Too Many Requests
                    response.setStatus(429); // HTTP 429 Too Many Requests
                    response.setContentType("application/json");
                    
                    Map<String, Object> errorResponse = new HashMap<>();
                    errorResponse.put("status", "error");
                    errorResponse.put("message", "Too many attempts for this phone number. Please try again later.");
                    errorResponse.put("remainingAttempts", 0);
                    
                    objectMapper.writeValue(response.getOutputStream(), errorResponse);
                    return;
                }
            }
        }
        
        // Continue with the filter chain
        filterChain.doFilter(request, response);
    }
    
    /**
     * Extract the client's real IP address, handling proxies
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }
        
        // If the IP contains multiple addresses (X-Forwarded-For can contain a list),
        // take the first one which is the client's IP
        if (ipAddress != null && ipAddress.contains(",")) {
            ipAddress = ipAddress.split(",")[0].trim();
        }
        
        return ipAddress;
    }
    
    /**
     * Extract phone number from request path
     */
    private String extractPhoneNumber(String path) {
        // This is a simple extraction, adjust based on your actual URL patterns
        String[] segments = path.split("/");
        for (int i = 0; i < segments.length - 1; i++) {
            if (segments[i].equals("phone") || segments[i].equals("listen")) {
                if (i + 2 < segments.length) {
                    // Format: /phone/{country}/{phoneNumber} or /listen/{country}/{phoneNumber}
                    return segments[i + 2];
                }
            }
        }
        return null;
    }
}
