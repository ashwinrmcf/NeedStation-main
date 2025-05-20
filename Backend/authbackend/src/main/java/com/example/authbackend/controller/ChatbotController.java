package com.example.authbackend.controller;

import com.example.authbackend.model.ChatRequest;
import com.example.authbackend.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "*")
public class ChatbotController {

    private final ChatbotService chatbotService;

    @Autowired
    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> processMessage(@RequestBody ChatRequest request) {
        Map<String, String> response = chatbotService.generateResponse(request.getMessage());
        return ResponseEntity.ok(response);
    }
}
