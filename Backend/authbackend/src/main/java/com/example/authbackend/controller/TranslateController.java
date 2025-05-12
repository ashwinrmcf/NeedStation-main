package com.example.authbackend.controller;

import com.example.authbackend.service.GoogleTranslateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

@RestController
@RequestMapping("/api/translate")
public class TranslateController {

    @Autowired
    private GoogleTranslateService translateService;

    @GetMapping
    public ResponseEntity<String> translateText(
            @RequestParam String text,
            @RequestParam String lang
    ) {
        String translated = translateService.translate(text, lang);
        return ResponseEntity.ok(translated);
    }

    @PostMapping("/batch")
    public ResponseEntity<Map<String, Object>> translateBatch(@RequestBody Map<String, Object> payload) {
        List<String> texts = (List<String>) payload.get("texts");
        String lang = (String) payload.get("lang");
        List<String> translations = new ArrayList<>();
        for (String text : texts) {
            translations.add(translateService.translate(text, lang));
        }
        Map<String, Object> response = new HashMap<>();
        response.put("translations", translations);
        return ResponseEntity.ok(response);
    }
}
