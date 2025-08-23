package com.example.authbackend.service;

import com.example.authbackend.dto.GoogleAuthRequest;
import com.example.authbackend.dto.GoogleAuthResponse;
import com.example.authbackend.model.User;
import com.example.authbackend.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class GoogleAuthService {

    private static final Logger logger = Logger.getLogger(GoogleAuthService.class.getName());

    @Value("${google.oauth.client-id}")
    private String googleClientId;

    private final UserRepository userRepository;

    @Autowired
    public GoogleAuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public GoogleAuthResponse authenticateWithGoogle(GoogleAuthRequest request) {
        try {
            // Verify Google ID Token
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), 
                    GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            logger.info("Verifying Google ID token with client ID: " + googleClientId);
            GoogleIdToken idToken = verifier.verify(request.getIdToken());
            logger.info("Token verification result: " + (idToken != null ? "SUCCESS" : "FAILED"));
            
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String picture = (String) payload.get("picture");
                
                logger.info("Google authentication successful for email: " + email);
                
                // Check if user exists, if not create new user
                User user = findOrCreateUser(email, name, picture);
                
                // Generate JWT token (you can implement JWT service)
                String jwtToken = generateJwtToken(user);
                
                String fullName = (user.getFirstName() != null ? user.getFirstName() : "") + 
                             " " + (user.getLastName() != null ? user.getLastName() : "");
                GoogleAuthResponse.UserInfo userInfo = new GoogleAuthResponse.UserInfo(
                    user.getEmail(), fullName.trim(), "");
                return new GoogleAuthResponse(true, "Authentication successful", jwtToken, userInfo);
                
            } else {
                logger.warning("Invalid Google ID token");
                return new GoogleAuthResponse(false, "Invalid Google ID token");
            }
            
        } catch (Exception e) {
            logger.severe("Google authentication failed: " + e.getMessage());
            return new GoogleAuthResponse(false, "Google authentication failed: " + e.getMessage());
        }
    }

    private User findOrCreateUser(String email, String name, String picture) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        
        if (existingUser.isPresent()) {
            // Update user info if needed
            User user = existingUser.get();
            // Split name into first and last name for Google users
            String[] nameParts = name.split(" ", 2);
            user.setFirstName(nameParts[0]);
            user.setLastName(nameParts.length > 1 ? nameParts[1] : "");
            return userRepository.save(user);
        } else {
            // Create new user
            User newUser = new User();
            newUser.setEmail(email);
            // Split name into first and last name for Google users
            String[] nameParts = name.split(" ", 2);
            newUser.setFirstName(nameParts[0]);
            newUser.setLastName(nameParts.length > 1 ? nameParts[1] : "");
            newUser.setProvider("GOOGLE");
            newUser.setVerified(true); // Google users are pre-verified
            return userRepository.save(newUser);
        }
    }

    /**
     * Verify Google token for signup flow - returns user data without creating account
     */
    public java.util.Map<String, Object> verifyGoogleTokenForSignup(String idToken) {
        try {
            // Verify Google ID Token
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), 
                    GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken token = verifier.verify(idToken);
            
            if (token != null) {
                GoogleIdToken.Payload payload = token.getPayload();
                
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                
                // Check if user already exists
                if (userRepository.findByEmail(email).isPresent()) {
                    return java.util.Map.of("error", "An account with this email already exists. Please use login instead.");
                }
                
                // Split name into first and last name
                String[] nameParts = name.split(" ", 2);
                String firstName = nameParts[0];
                String lastName = nameParts.length > 1 ? nameParts[1] : "";
                
                return java.util.Map.of(
                    "email", email,
                    "name", name,
                    "firstName", firstName,
                    "lastName", lastName
                );
                
            } else {
                return java.util.Map.of("error", "Invalid Google ID token");
            }
            
        } catch (Exception e) {
            logger.severe("Google token verification failed: " + e.getMessage());
            return java.util.Map.of("error", "Google token verification failed: " + e.getMessage());
        }
    }

    private String generateJwtToken(User user) {
        // Simple token generation - you can implement proper JWT here
        // For now, return a basic token
        return "jwt_token_for_" + user.getEmail().replace("@", "_at_");
    }
}
