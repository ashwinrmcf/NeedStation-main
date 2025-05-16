package com.example.authbackend.service;

<<<<<<< HEAD
=======
import org.cloudinary.json.JSONArray;
import org.cloudinary.json.JSONObject;
>>>>>>> 1008e561591a1687e1e5894e1664b046427cf89d
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

<<<<<<< HEAD
=======
import java.util.ArrayList;
>>>>>>> 1008e561591a1687e1e5894e1664b046427cf89d
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.stereotype.Service;

@Service
public class GoogleTranslateService {
<<<<<<< HEAD
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
=======

    private final String API_KEY = "AIzaSyDaEJ4vo3cRDG90bsEVw2C98QNQlP5Ai6o";
    private final String ENDPOINT = "https://translation.googleapis.com/language/translate/v2";

    public List<String> translateTexts(List<String> texts, String targetLang) {
        List<String> results = new ArrayList<>();
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = ENDPOINT + "?key=" + API_KEY;

            Map<String, Object> body = new HashMap<>();
            body.put("q", texts);
            body.put("target", targetLang);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            JSONObject json = new JSONObject(response.getBody());

            JSONArray translations = json.getJSONObject("data").getJSONArray("translations");
            for (int i = 0; i < translations.length(); i++) {
                results.add(translations.getJSONObject(i).getString("translatedText"));
            }

        } catch (Exception e) {
            e.printStackTrace();
            results = texts; // fallback to original
        }
        return results;
    }
}
>>>>>>> 1008e561591a1687e1e5894e1664b046427cf89d
