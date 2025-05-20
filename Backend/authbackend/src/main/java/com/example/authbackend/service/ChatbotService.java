package com.example.authbackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatbotService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final RestTemplate restTemplate;
    private String projectContext;

    public ChatbotService() {
        this.restTemplate = new RestTemplate();
        loadProjectContext();
    }

    /**
     * Loads the detailed project context from a file or initializes it with hardcoded data
     */
    private void loadProjectContext() {
        // Initialize with a comprehensive description of NeedStation
        this.projectContext = """
            NeedStation is a service marketplace platform connecting helpers/taskers with clients for various services.
            
            CORE FEATURES AND SERVICES:
            1. Home Services - Cleaning, Plumbing, Electrical work, Carpentry, Gardening, Painting, etc.
            2. Professional Services - IT support, Legal consultation, Accounting, Design, Marketing, etc.
            3. Personal Services - Tutoring, Fitness training, Cooking, Childcare, Elder care, etc.
            4. Delivery Services - Groceries, Medicine, Food, Documents, Packages, etc.
            5. Event Services - Photography, Catering, Event planning, DJ/Music, Decoration, etc.
            
            USER TYPES:
            1. Clients - People who need services and can post jobs
            2. Taskers/Helpers - Service providers who can apply for jobs and get hired
            3. Admins - Platform managers who oversee operations
            
            PLATFORM BENEFITS:
            - Verified service providers with ratings and reviews
            - Secure payment system with escrow protection
            - Service guarantees and insurance options
            - Real-time tracking and communication
            - Flexible scheduling and booking options
            - Multi-language support for international users
            
            HOW IT WORKS:
            1. Clients post a job with requirements, budget, and timeline
            2. Available taskers place bids or express interest
            3. Client reviews profiles, ratings, and chooses a tasker
            4. Service is delivered as agreed upon
            5. Payment is released after client confirms satisfaction
            6. Both parties leave reviews
            
            REGISTRATION PROCESS:
            1. Simple sign-up with email or social media accounts
            2. Identity verification for security
            3. Taskers undergo background checks and skill verification
            4. Users complete profiles with necessary details
            
            PRICING:
            - Service fees vary based on category and complexity
            - Platform charges 5-15% commission on transactions
            - Premium membership options available for both clients and taskers
            - Discount programs for regular users
            
            SUPPORT:
            - 24/7 customer service via chat, email, and phone
            - Comprehensive help center and FAQs
            - Dispute resolution system
            - Satisfaction guarantee policy
            
            TECHNOLOGY:
            - Mobile apps for Android and iOS
            - Web platform with responsive design
            - Real-time notifications and updates
            - Secure messaging system
            - Location-based service matching
            - AI-powered recommendation engine
            
            SAFETY MEASURES:
            - Verified user profiles and background checks
            - Secure payment processing
            - Insurance coverage for services
            - Rating and review system for quality control
            - Privacy protection for user data
            """;
    }

    public Map<String, String> generateResponse(String message) {
        Map<String, String> response = new HashMap<>();
        
        try {
            // First try the Gemini API
            String apiUrl = geminiApiUrl;
            if (apiUrl.contains("?")) {
                apiUrl += "&key=" + geminiApiKey;
            } else {
                apiUrl += "?key=" + geminiApiKey;
            }
            
            // Build a simple JSON structure for the Gemini API
            Map<String, Object> requestBody = new HashMap<>();
            
            // The prompt that includes context about NeedStation
            String promptText = "You are the official AI assistant for NeedStation, a service marketplace platform. " +
                               "Use the following information about NeedStation: \n\n" + projectContext + "\n\n" +
                               "USER QUERY: " + message + "\n\n" +
                               "Provide a helpful, accurate response based on this information. Be concise but informative.";
            
            // Create the contents structure expected by Gemini API
            List<Map<String, Object>> contents = new ArrayList<>();
            Map<String, Object> content = new HashMap<>();
            content.put("role", "user");
            
            List<Map<String, String>> parts = new ArrayList<>();
            Map<String, String> part = new HashMap<>();
            part.put("text", promptText);
            parts.add(part);
            
            content.put("parts", parts);
            contents.add(content);
            requestBody.put("contents", contents);
            
            // Add generation parameters
            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("temperature", 0.2);
            generationConfig.put("maxOutputTokens", 800);
            requestBody.put("generationConfig", generationConfig);
            
            // Set up headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            // Log request details for debugging
            System.out.println("\n===== GEMINI API REQUEST =====");
            System.out.println("URL: " + apiUrl);
            
            // Make the API call
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            
            try {
                @SuppressWarnings("unchecked")
                Map<String, Object> apiResponse = restTemplate.postForObject(apiUrl, entity, Map.class);
                
                // Log the response
                System.out.println("\n===== GEMINI API RESPONSE =====");
                System.out.println("Response received: " + (apiResponse != null));
                
                if (apiResponse != null) {
                    // Check for error first
                    if (apiResponse.containsKey("error")) {
                        @SuppressWarnings("unchecked")
                        Map<String, Object> error = (Map<String, Object>) apiResponse.get("error");
                        String errorMessage = "API Error: " + error.get("message");
                        System.out.println(errorMessage);
                        response.put("response", generateFallbackResponse(message));
                        return response;
                    }
                    
                    // Try to extract the response
                    if (apiResponse.containsKey("candidates")) {
                        @SuppressWarnings("unchecked")
                        List<Map<String, Object>> candidates = (List<Map<String, Object>>) apiResponse.get("candidates");
                        
                        if (candidates != null && !candidates.isEmpty()) {
                            Map<String, Object> candidate = candidates.get(0);
                            @SuppressWarnings("unchecked")
                            Map<String, Object> candidateContent = (Map<String, Object>) candidate.get("content");
                            
                            if (candidateContent != null && candidateContent.containsKey("parts")) {
                                @SuppressWarnings("unchecked")
                                List<Map<String, Object>> responseParts = (List<Map<String, Object>>) candidateContent.get("parts");
                                
                                if (responseParts != null && !responseParts.isEmpty()) {
                                    String text = (String) responseParts.get(0).get("text");
                                    response.put("response", text);
                                    return response;
                                }
                            }
                        }
                    }
                }
            } catch (Exception e) {
                System.out.println("Error calling Gemini API: " + e.getMessage());
                e.printStackTrace();
            }
            
            // If we reach here, use the fallback response
            response.put("response", generateFallbackResponse(message));
            
        } catch (Exception e) {
            e.printStackTrace();
            response.put("response", "I'm having trouble connecting to my knowledge base. Let me provide some general information: " + generateFallbackResponse(message));
        }
        
        return response;
    }

    /**
     * Fallback response generator when API is unavailable or fails
     */
    private String generateFallbackResponse(String message) {
        String normalizedMessage = message.toLowerCase().trim();

        // Basic greeting responses
        if (normalizedMessage.contains("hello") || normalizedMessage.contains("hi ") || normalizedMessage.equals("hi")) {
            return "Hello! I'm the NeedStation assistant. How can I help you today?";
        }
        
        // Language support
        if (normalizedMessage.contains("language") || normalizedMessage.contains("translate") || normalizedMessage.contains("translation")) {
            return "NeedStation is available in multiple languages including English, Hindi, Tamil, Bengali, Malayalam, Telugu, Kannada, and Gujarati. You can change your language preference in the settings or from the translation center.";
        }
        
        // How it works
        if (normalizedMessage.contains("how does it work") || normalizedMessage.contains("process")) {
            return "NeedStation works in 4 simple steps: 1) Create an account, 2) Browse available services or post a job, 3) Select a service provider based on ratings and reviews, 4) Schedule and pay securely through our platform. Once the service is completed, you can rate your provider to help others.";
        }
        
        // Safety
        if (normalizedMessage.contains("safety") || normalizedMessage.contains("secure") || normalizedMessage.contains("safe")) {
            return "Your safety is our priority at NeedStation. All service providers undergo identity verification and background checks. Our platform uses secure payment processing, and we offer a satisfaction guarantee for all completed services.";
        }
        
        // Locations
        if (normalizedMessage.contains("location") || normalizedMessage.contains("area") || normalizedMessage.contains("where")) {
            return "NeedStation is available in major cities across India including Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, and many more. We're continuously expanding to new locations to provide our services to more customers.";
        }
        
        // Mobile app
        if (normalizedMessage.contains("app") || normalizedMessage.contains("mobile") || normalizedMessage.contains("download")) {
            return "The NeedStation mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store by searching for 'NeedStation'. The app offers all the same features as our website with added convenience.";
        }
        
        // Discounts and offers
        if (normalizedMessage.contains("discount") || normalizedMessage.contains("offer") || normalizedMessage.contains("coupon")) {
            return "NeedStation regularly offers discounts and promotions for both new and returning customers. Check our homepage for current offers, or sign up for our newsletter to receive special deals. New users often receive a welcome discount on their first service.";
        }
        
        // Satisfaction guarantee
        if (normalizedMessage.contains("guarantee") || normalizedMessage.contains("refund") || normalizedMessage.contains("satisfaction")) {
            return "NeedStation offers a satisfaction guarantee. If you're not satisfied with a service, please report it within 48 hours and we'll work to resolve the issue. In many cases, we can arrange for the service to be redone or provide a partial/full refund depending on the circumstances.";
        }
        
        // Availability hours
        if (normalizedMessage.contains("hours") || normalizedMessage.contains("availability") || normalizedMessage.contains("when")) {
            return "Service providers on NeedStation set their own availability, but most services can be booked 7 days a week, from early morning to evening. Some emergency services may also be available 24/7. You can see a provider's availability when booking.";
        }
        
        // Default fallback
        return "I don't have specific information about that query yet. For more detailed assistance, please contact our support team at support@needstation.com or call +1-800-NEED-HELP during business hours.";
    }
}
