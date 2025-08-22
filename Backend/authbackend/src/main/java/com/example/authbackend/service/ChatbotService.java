package com.example.authbackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.authbackend.dto.ChatbotResponse;

import java.util.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class ChatbotService {

    private static final Logger logger = Logger.getLogger(ChatbotService.class.getName());
    
    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;
    
    // The model to use (Gemini 2.5 Pro or Flash)
    @Value("${gemini.model:gemini-2.5-pro}")
    private String geminiModel;

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

    private static final Map<Pattern, Map<String, String>> navigationIntents = new LinkedHashMap<>();

    static {
        // Order matters: more specific patterns should come before general ones if overlap is possible
        // Home
        navigationIntents.put(Pattern.compile("\\b(home|main page|landing page|go home)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/", "buttonText", "Go to Home", "message", "Sure, taking you to the home page!"));
        // Contact Us
        navigationIntents.put(Pattern.compile("\\b(contact|contact us|reach out|support|talk to support)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/contact-us", "buttonText", "Go to Contact Us", "message", "I can help you get to our contact page."));
        // How It Works
        navigationIntents.put(Pattern.compile("\\b(how it works|info|learn more|details|how does this work)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/about-us", "buttonText", "Learn About Us", "message", "Let's check out more information about NeedStation."));
        // Login
        navigationIntents.put(Pattern.compile("\\b(login|sign in|access account|log in)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/login", "buttonText", "Go to Login", "message", "Heading to the login page."));
        // Register
        navigationIntents.put(Pattern.compile("\\b(register|sign up|create account)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/register", "buttonText", "Create Account", "message", "Let's get you to the registration page."));
        // Services
        navigationIntents.put(Pattern.compile("\\b(services|features|what you offer|products)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/basic-needs-home", "buttonText", "View Services", "message", "Here are the services we offer."));
        
        // General Language Settings - for requests about "languages" or "translation" in general
        navigationIntents.put(Pattern.compile("\\b(language|languages|translate|translation|change language|switch language|available languages|list languages|all languages)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/language-settings", "buttonText", "View All Languages", "message", "We support English, Hindi, Tamil, Bengali, Malayalam, Telugu, Kannada, and Gujarati."));
                
        // Specific language intents with direct links
        navigationIntents.put(Pattern.compile("\\b(hindi|change to hindi|hindi language|in hindi)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/hi", "buttonText", "Switch to Hindi", "message", "Switching to Hindi."));
                
        // For other languages, we'll still go to the language settings page but with specific message
        navigationIntents.put(Pattern.compile("\\b(tamil|change to tamil|tamil language|in tamil)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/language-settings", "buttonText", "Switch to Tamil", "message", "Let me take you to Tamil settings."));
                
        navigationIntents.put(Pattern.compile("\\b(bengali|change to bengali|bengali language|in bengali)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/language-settings", "buttonText", "Switch to Bengali", "message", "Let me take you to Bengali settings."));
                
        navigationIntents.put(Pattern.compile("\\b(malayalam|change to malayalam|malayalam language|in malayalam)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/language-settings", "buttonText", "Switch to Malayalam", "message", "Let me take you to Malayalam settings."));
                
        navigationIntents.put(Pattern.compile("\\b(telugu|change to telugu|telugu language|in telugu)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/language-settings", "buttonText", "Switch to Telugu", "message", "Let me take you to Telugu settings."));
                
        navigationIntents.put(Pattern.compile("\\b(kannada|change to kannada|kannada language|in kannada)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/language-settings", "buttonText", "Switch to Kannada", "message", "Let me take you to Kannada settings."));
                
        navigationIntents.put(Pattern.compile("\\b(gujarati|change to gujarati|gujarati language|in gujarati)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/language-settings", "buttonText", "Switch to Gujarati", "message", "Let me take you to Gujarati settings."));
                
        navigationIntents.put(Pattern.compile("\\b(english|change to english|english language|in english)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/", "buttonText", "Switch to English", "message", "Switching to English."));
        
        // Specific services - updated URLs to match your actual routes
        navigationIntents.put(Pattern.compile("\\b(plumber|plumbing|water leak|pipe|drain)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/plumber", "buttonText", "View Plumbing Services", "message", "I'll take you to our plumbing services page where you can find qualified plumbers."));
        navigationIntents.put(Pattern.compile("\\b(electrician|electrical|wiring|socket|outlet|light fixture)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/electrician", "buttonText", "View Electrical Services", "message", "I'll show you our electrical services offered by professional electricians."));
        navigationIntents.put(Pattern.compile("\\b(water delivery|water supply|water tanker|drinking water)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/water-supply", "buttonText", "View Water Supply Services", "message", "Let me take you to our water supply services page."));
        navigationIntents.put(Pattern.compile("\\b(maid|cleaning|housekeeper|dusting|mopping)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/maid-services", "buttonText", "View Maid Services", "message", "I'll show you our maid and cleaning services options."));
        navigationIntents.put(Pattern.compile("\\b(baby sitter|babysitter|child care)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/babysitter", "buttonText", "View Babysitting Services", "message", "I'll take you to our babysitting services page."));
        navigationIntents.put(Pattern.compile("\\b(caretaker|elder care|senior care|patient care)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/caretaker", "buttonText", "View Caretaker Services", "message", "Let me show you our caretaking services for elderly and patients."));
        navigationIntents.put(Pattern.compile("\\b(nurse|nursing|medical care|healthcare)\\b", Pattern.CASE_INSENSITIVE),
                Map.of("url", "/nurse", "buttonText", "View Nursing Services", "message", "I'll take you to our nursing services page."));
        // Add more service-specific intents as needed
    }

    public ChatbotResponse generateResponse(String query) {
        // Check for navigation intents first
        for (Map.Entry<Pattern, Map<String, String>> entry : navigationIntents.entrySet()) {
            Pattern pattern = entry.getKey();
            Map<String, String> intentDetails = entry.getValue();
            Matcher matcher = pattern.matcher(query);
            if (matcher.find()) {
                logger.info("Navigation intent recognized for query: '" + query + "' -> " + intentDetails.get("url"));
                return new ChatbotResponse(intentDetails.get("message"), intentDetails.get("url"), intentDetails.get("buttonText"));
            }
        }

        logger.info("No navigation intent. Querying Gemini for: '" + query + "'");

        try {
            // Check if API key and URL are properly configured
            if (geminiApiKey == null || geminiApiKey.trim().isEmpty() || !geminiApiKey.startsWith("AIza")) {
                logger.warning("ERROR: Invalid Gemini API key format: " + 
                    (geminiApiKey == null ? "null" : 
                    (geminiApiKey.isEmpty() ? "empty" : geminiApiKey.substring(0, 4) + "...")));
                return new ChatbotResponse("I'm having trouble connecting to my AI service due to configuration issues. Please try again later.");
            }
            
            // Construct the Gemini 2.5 API URL with the model and key
            // Format: https://generativelanguage.googleapis.com/v1beta/models/MODEL_ID:generateContent?key=API_KEY
            String baseApiUrl = geminiApiUrl;
            // Ensure we're using the v1beta endpoint
            baseApiUrl = baseApiUrl.replace("/v1/", "/v1beta/");
            
            // Make sure we're using the correct endpoint format for the model
            // For gemini-pro, use v1 endpoint (stable)
            // For newer models like gemini-1.5-pro or gemini-2.5-pro, use v1beta
            if (geminiModel.equals("gemini-pro")) {
                baseApiUrl = baseApiUrl.replace("/v1beta/", "/v1/");
            } else {
                baseApiUrl = baseApiUrl.replace("/v1/", "/v1beta/");
            }
            
            // If the URL doesn't contain the model, update it
            if (!baseApiUrl.contains(geminiModel)) {
                baseApiUrl = baseApiUrl.replaceAll("models/[^:]+:", "models/" + geminiModel + ":");
            }
            
            // Add the API key
            String apiUrl = baseApiUrl;
            if (apiUrl.contains("?")) {
                apiUrl += "&key=" + geminiApiKey;
            } else {
                apiUrl += "?key=" + geminiApiKey;
            }
            
            // Log API configuration for debugging
            logger.info("Using Gemini API URL: " + apiUrl.replaceAll("key=.*", "key=REDACTED"));
            logger.info("Using Gemini model: " + geminiModel);
            logger.info("API Key format check: " + (geminiApiKey.startsWith("AIza") ? "Valid prefix" : "Invalid prefix"));
            
            // Build the JSON structure for Gemini 2.5 API
            Map<String, Object> requestBody = new HashMap<>();
            
            // The prompt that includes context about NeedStation with stronger instructions
            String promptText = "<s>\n" +
                               "You are NeedBot, the integrated AI assistant within the NeedStation web application. \n" +
                               "You are NOT a separate AI service - you ARE part of the NeedStation website itself. \n" +
                               "Important rules to follow:\n" +
                               "1. NEVER say you can't provide links or redirect users - you are built into the website and CAN redirect users.\n" +
                               "2. NEVER say 'I'm an AI and not the actual website' - you ARE part of the actual website.\n" +
                               "3. NEVER refer to NeedStation in the third person - always use 'we', 'our', or 'us'.\n" +
                               "4. ALWAYS provide direct, actionable information about NeedStation's services.\n" +
                               "5. When users ask about specific services, ALWAYS mention you can take them to that service page.\n" +
                               "6. ALWAYS keep responses extremely short, ideally 1-2 brief sentences. Be concise and direct.\n" +
                               "7. Maintain a friendly tone but prioritize brevity over detailed explanations.\n" +
                               "8. For language-related questions, mention we support English, Hindi, Tamil, Bengali, Malayalam, Telugu, Kannada, and Gujarati.\n" +
                               "</s>\n\n" +
                               "NeedStation service information:\n\n" + projectContext + "\n\n" +
                               "USER QUERY: " + query + "\n\n" +
                               "Remember your responses MUST be extremely brief and to-the-point (no more than 1-2 short sentences if possible). " +
                               "Be helpful but prioritize brevity above all. Avoid all unnecessary words and explanations.";
            
            // Create the contents structure expected by Gemini API (v1beta format)
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
            
            // Add generation parameters - Gemini 2.5 specific settings
            Map<String, Object> generationConfig = new HashMap<>();
            // Application temperature setting
            double temperature = 0.1;  // Very low temperature for more predictable, concise outputses
            generationConfig.put("temperature", temperature); 
            generationConfig.put("maxOutputTokens", 1024); // Increased to support more detailed responses
            generationConfig.put("topP", 0.95); // Added for improved response quality
            generationConfig.put("topK", 64); // Added for improved response quality
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
                logger.info("Sending request to Gemini API...");
                
                // Make the API call with improved error handling
                logger.info("Making API call to: " + apiUrl.replaceAll("key=.*", "key=REDACTED"));
                
                ResponseEntity<Map> responseEntity = restTemplate.postForEntity(apiUrl, entity, Map.class);
                Map apiResponse = responseEntity.getBody();
                
                // Log the response
                logger.info("\n===== GEMINI API RESPONSE =====");
                logger.info("HTTP Status: " + responseEntity.getStatusCode());
                logger.info("Response received: " + (apiResponse != null));
                
                // Log the entire raw response structure for debugging
                if (apiResponse != null) {
                    logger.info("API Response keys: " + apiResponse.keySet());
                    logger.info("Full API Response: " + apiResponse);
                } else {
                    logger.warning("API Response is null!");
                }
                
                if (apiResponse != null) {
                    // Check for error first
                    if (apiResponse.containsKey("error")) {
                        @SuppressWarnings("unchecked")
                        Map<String, Object> error = (Map<String, Object>) apiResponse.get("error");
                        String errorMessage = "API Error: " + error.get("message");
                        logger.warning(errorMessage);
                        return new ChatbotResponse(generateFallbackMessage(query));
                    }
                    
                    // Try to extract the response from Gemini format
                    if (apiResponse.containsKey("candidates")) {
                        @SuppressWarnings("unchecked")
                        List<Map<String, Object>> candidates = (List<Map<String, Object>>) apiResponse.get("candidates");
                        
                        if (candidates != null && !candidates.isEmpty()) {
                            Map<String, Object> candidate = candidates.get(0);
                            
                            // Check for finish reason
                            if (candidate.containsKey("finishReason")) {
                                String finishReason = (String) candidate.get("finishReason");
                                logger.info("Finish reason: " + finishReason);
                                
                                // If the finish reason is not STOP, log a warning
                                if (!"STOP".equals(finishReason)) {
                                    logger.warning("Response was cut off due to: " + finishReason);
                                }
                            }
                            
                            @SuppressWarnings("unchecked")
                            Map<String, Object> candidateContent = (Map<String, Object>) candidate.get("content");
                            
                            if (candidateContent != null && candidateContent.containsKey("parts")) {
                                @SuppressWarnings("unchecked")
                                List<Map<String, Object>> responseParts = (List<Map<String, Object>>) candidateContent.get("parts");
                                
                                if (responseParts != null && !responseParts.isEmpty()) {
                                    String text = (String) responseParts.get(0).get("text");
                                    return new ChatbotResponse(text);
                                }
                            }
                        }
                    }
                }
            } catch (Exception e) {
                logger.warning("Error calling Gemini API: " + e.getMessage());
logger.severe("Exception stack trace:");
e.printStackTrace();
                logger.warning("Gemini API call failed. Using fallback response for query: " + query);
                // Ensure fallback also returns ChatbotResponse
                String fallbackMessage = generateFallbackMessage(query); 
                return new ChatbotResponse(fallbackMessage);
            }
            
            // If we reach here, use the fallback response
            return new ChatbotResponse(generateFallbackMessage(query));
        } catch (Exception e) {
            e.printStackTrace();
            return new ChatbotResponse("I'm having trouble connecting to my knowledge base. Let me provide some general information: " + generateFallbackMessage(query));
        }
    }

    // Renamed to avoid signature conflict if generateFallbackResponse were to return ChatbotResponse directly
    /**
     * Generates a fallback response when the API is unavailable.
     * Note: This method now formats responses to always be in first-person as NeedStation.
     */
    private String generateFallbackMessage(String query) {
        String normalizedMessage = query.toLowerCase().trim();
        
        logger.info("Generating fallback response for: " + query);

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
        String defaultFallback = "I don't have specific information about that query yet. For more detailed assistance, please contact our support team.";
        
        // Example of how you could make fallbacks slightly more interactive if needed in future
        // though for simple text, this is fine.
        if (query.toLowerCase().contains("help")) {
            return "I can try to help. What do you need assistance with?";
        }
        return defaultFallback;
    }
}
