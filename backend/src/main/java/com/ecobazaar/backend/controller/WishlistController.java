package com.ecobazaar.backend.controller;

import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.model.User;
import com.ecobazaar.backend.repository.ProductRepository;
import com.ecobazaar.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<?> getWishlist(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body("UNAUTHORIZED");
        }

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(user.getWishlist());
    }


    @PostMapping("/{productId}")
    public ResponseEntity<?> addToWishlist(@PathVariable Long productId, Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        user.getWishlist().add(product);
        userRepository.save(user);
        
        return ResponseEntity.ok("Added to wishlist");
    }
    
    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable Long productId, Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body("UNAUTHORIZED");
        }

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Remove product from wishlist
        user.getWishlist().remove(product);
        userRepository.save(user);

        return ResponseEntity.ok("Removed from wishlist");
    }

}