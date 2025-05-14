package com.example.authbackend.security;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

/**
 * A simple rate limiter to prevent abuse of OTP services
 */
@Component
public class RateLimiter {
    
    // Store IP -> attempts mapping
    private final Map<String, RateLimit> ipLimits = new ConcurrentHashMap<>();
    
    // Store phone -> attempts mapping
    private final Map<String, RateLimit> phoneLimits = new ConcurrentHashMap<>();
    
    // Configure limits
    private static final int MAX_REQUESTS_PER_IP = 10;
    private static final int MAX_REQUESTS_PER_PHONE = 5;
    private static final Duration TIME_WINDOW = Duration.ofMinutes(15);
    
    /**
     * Check if an IP has exceeded rate limits
     * @param ip The client IP address
     * @return true if rate limit exceeded, false otherwise
     */
    public boolean isIpLimited(String ip) {
        cleanupExpiredEntries();
        
        RateLimit limit = ipLimits.computeIfAbsent(ip, k -> new RateLimit());
        
        if (limit.isLimited(MAX_REQUESTS_PER_IP, TIME_WINDOW)) {
            return true;
        }
        
        limit.incrementCount();
        return false;
    }
    
    /**
     * Check if a phone number has exceeded rate limits
     * @param phone The phone number
     * @return true if rate limit exceeded, false otherwise
     */
    public boolean isPhoneLimited(String phone) {
        cleanupExpiredEntries();
        
        RateLimit limit = phoneLimits.computeIfAbsent(phone, k -> new RateLimit());
        
        if (limit.isLimited(MAX_REQUESTS_PER_PHONE, TIME_WINDOW)) {
            return true;
        }
        
        limit.incrementCount();
        return false;
    }
    
    /**
     * Get the current count of attempts for an IP
     * @param ip The client IP address
     * @return The number of recent attempts
     */
    public int getIpAttemptCount(String ip) {
        RateLimit limit = ipLimits.get(ip);
        return limit != null ? limit.getCount() : 0;
    }
    
    /**
     * Get the current count of attempts for a phone
     * @param phone The phone number
     * @return The number of recent attempts
     */
    public int getPhoneAttemptCount(String phone) {
        RateLimit limit = phoneLimits.get(phone);
        return limit != null ? limit.getCount() : 0;
    }
    
    /**
     * Reset the rate limit for a phone number
     * @param phone The phone number to reset
     */
    public void resetPhoneLimit(String phone) {
        phoneLimits.remove(phone);
    }
    
    /**
     * Reset the rate limit for an IP address
     * @param ip The IP address to reset
     */
    public void resetIpLimit(String ip) {
        ipLimits.remove(ip);
    }
    
    /**
     * Clean up expired entries to prevent memory leaks
     */
    private void cleanupExpiredEntries() {
        LocalDateTime now = LocalDateTime.now();
        
        // Clean up IP limits
        ipLimits.entrySet().removeIf(entry -> 
            Duration.between(entry.getValue().getLastAttempt(), now).compareTo(TIME_WINDOW) > 0);
        
        // Clean up phone limits
        phoneLimits.entrySet().removeIf(entry -> 
            Duration.between(entry.getValue().getLastAttempt(), now).compareTo(TIME_WINDOW) > 0);
    }
    
    /**
     * Inner class to track rate limits
     */
    private static class RateLimit {
        private int count = 0;
        private LocalDateTime lastAttempt = LocalDateTime.now();
        
        public boolean isLimited(int maxRequests, Duration timeWindow) {
            LocalDateTime now = LocalDateTime.now();
            
            // If the time window has passed, reset the count
            if (Duration.between(lastAttempt, now).compareTo(timeWindow) > 0) {
                count = 0;
                lastAttempt = now;
                return false;
            }
            
            // Check if we've exceeded the limit
            return count >= maxRequests;
        }
        
        public void incrementCount() {
            count++;
            lastAttempt = LocalDateTime.now();
        }
        
        public int getCount() {
            return count;
        }
        
        public LocalDateTime getLastAttempt() {
            return lastAttempt;
        }
    }
}
