package com.ecobazaar.backend.controller;

import com.ecobazaar.backend.model.CartItem;
import com.ecobazaar.backend.service.CartService;
import com.ecobazaar.backend.service.RecommendationService;
import org.springframework.http.ResponseEntity; // Added
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;
    private final RecommendationService recommendationService;

    public CartController(CartService cartService, RecommendationService recommendationService) {
        this.cartService = cartService;
        this.recommendationService = recommendationService;
    }

    @PostMapping("/add/{productId}")
    public void addToCart(@PathVariable Long productId) {
        cartService.add(productId);
    }

    @GetMapping
    public List<CartItem> getCart() {
        return cartService.getCartItems();
    }

    @GetMapping("/summary")
    public Map<String, Object> getCartSummary() {
        List<CartItem> items = cartService.getCartItems();
        
        double totalCarbon = items.stream()
                .mapToDouble(i -> i.getProduct().getCarbonImpact() * i.getQuantity())
                .sum();
        
        double totalPrice = items.stream()
                .mapToDouble(i -> i.getProduct().getPrice() * i.getQuantity())
                .sum();

        Map<String, Object> summary = new HashMap<>();
        summary.put("items", items);
        summary.put("totalCarbon", totalCarbon);
        summary.put("totalPrice", totalPrice);
        summary.put("ecoMessage", "This purchase has a carbon footprint of " + totalCarbon + " kg CO2e.");
        
        return summary;
    }

    @GetMapping("/recommendations/{productId}")
    public ResponseEntity<?> getSuggestions(@PathVariable Long productId) {
        // Calls the synchronized recommendation service
        return ResponseEntity.ok(recommendationService.getGreenAlternatives(productId));
    }
}