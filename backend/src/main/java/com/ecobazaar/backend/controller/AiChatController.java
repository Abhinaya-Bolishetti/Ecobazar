package com.ecobazaar.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AiChatController {

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> body) {
        String q = body.getOrDefault("message", "").toLowerCase().trim();
        String answer;

        if (q.contains("what is carbon") || q.contains("carbon impact") || q.contains("carbon footprint")) {
            answer = "Carbon impact refers to the total CO₂ emissions produced during a product’s lifecycle, including manufacturing, packaging, and delivery. Lower carbon impact means the product is more eco-friendly.";
        } 
        else if (q.contains("reduce") || q.contains("how can i reduce")) {
            answer = "You can reduce your carbon footprint by choosing eco-certified products, avoiding single-use plastics, using reusable items, and preferring products with lower carbon impact ratings on EcoBazaar.";
        } 
        else if (q.contains("suggest") || q.contains("alternatives") || q.contains("eco-friendly alternatives")) {
            answer = "Here are some greener alternatives: switch plastic bottles to steel bottles, plastic bags to cloth bags, and disposable cutlery to reusable cutlery. EcoBazaar highlights such low-carbon alternatives for you.";
        } 
        else if (q.contains("which products") || q.contains("eco-friendly products")) {
            answer = "Eco-friendly products on EcoBazaar include bamboo toothbrushes, cloth bags, steel bottles, organic soaps, and reusable containers. You can filter products by eco-rating to find them easily.";
        } 
        else if (q.contains("why") && q.contains("eco")) {
            answer = "Choosing eco-friendly products reduces environmental pollution, lowers carbon emissions, and supports sustainable manufacturing practices. Small choices can make a big positive impact over time.";
        }
        else if (q.contains("hello") || q.contains("hi")) {
            answer = "Hi there! I’m the EcoBazaar AI assistant 🌱 Ask me about eco-friendly products, carbon impact, or how to shop sustainably.";
        } 
        else {
            answer = "I can help with eco-friendly products, carbon impact, greener alternatives, and sustainable shopping tips. Try asking something like 'How can I reduce my carbon footprint?'";
        }

        Map<String, String> res = new HashMap<>();
        res.put("reply", answer);
        return ResponseEntity.ok(res);
    }
}
