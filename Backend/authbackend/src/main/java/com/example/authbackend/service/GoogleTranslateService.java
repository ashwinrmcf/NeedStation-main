package com.example.authbackend.service;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.stereotype.Service;

@Service
public class GoogleTranslateService {
    private final String API_KEY = "AIzaSyDaEJ4vo3cRDG90bsEVw2C98QNQlP5Ai6o"; // Replace with your real API key

    public String translate(String text, String targetLang) {
        try {
            String urlStr = "https://translation.googleapis.com/language/translate/v2?key=" + API_KEY;

            RestTemplate restTemplate = new RestTemplate();

            // Set up headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Set up request body
            Map<String, Object> body = new HashMap<>();
            body.put("q", text);
            body.put("target", targetLang);

            // Wrap body and headers into HttpEntity
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            // Make the POST request
            ResponseEntity<String> response = restTemplate.postForEntity(urlStr, entity, String.class);

            // Parse the JSON response to extract the translated text
            String jsonResponse = response.getBody();
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(jsonResponse);
            JsonNode translationsNode = rootNode.path("data").path("translations");
            
            if (translationsNode.isArray() && translationsNode.size() > 0) {
                return translationsNode.get(0).path("translatedText").asText();
            }
            
            return "Unable to extract translation from response.";
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Translation error details: " + e.getMessage());
            return "Error in translation: " + e.getMessage();
        }
    }
}