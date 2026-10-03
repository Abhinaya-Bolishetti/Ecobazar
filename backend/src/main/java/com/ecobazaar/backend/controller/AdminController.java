package com.ecobazaar.backend.controller;

import com.ecobazaar.backend.dto.DashboardStatsDTO;
import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.model.User;
import com.ecobazaar.backend.repository.ProductRepository;
import com.ecobazaar.backend.repository.UserRepository;
import com.ecobazaar.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasAuthority('ADMIN')") // Restrict all endpoints to Admins
public class AdminController {

    @Autowired private UserRepository userRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private ProductService productService;

    // --- USER MANAGEMENT ---

    /**
     * Fetch all users (Sellers or Customers) waiting for approval.
     */
    @GetMapping("/users/pending")
    public List<User> getPendingUsers() {
        return userRepository.findByStatus("PENDING"); //
    }

    /**
     * Approve a user (Customer -> ACTIVE, Seller -> APPROVED).
     */
    @PutMapping("/users/approve/{id}")
    public ResponseEntity<?> approveUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // If it's a seller, set to APPROVED; otherwise, set to ACTIVE
        if ("SELLER".equals(user.getRole())) {
            user.setStatus("APPROVED"); //
        } else {
            user.setStatus("ACTIVE");
        }
        
        userRepository.save(user);
        return ResponseEntity.ok("User status updated to: " + user.getStatus());
    }

    // --- PRODUCT MANAGEMENT ---

    /**
     * Fetch all products waiting for Admin verification.
     */
    @GetMapping("/products/pending")
    public List<Product> getPendingProducts() {
        return productRepository.findByStatus("PENDING"); //
    }

    /**
     * Approve a product so it appears in the public shop.
     */
    @PutMapping("/products/verify/{id}")
    public ResponseEntity<?> verifyProduct(@PathVariable Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        product.setStatus("APPROVED"); //
        productRepository.save(product);
        return ResponseEntity.ok("Product verified and live!");
    }

    /**
     * Reject or delete a product.
     */
    @DeleteMapping("/products/reject/{id}")
    public ResponseEntity<?> rejectProduct(@PathVariable Long id) {
        productService.delete(id); //
        return ResponseEntity.ok("Product rejected and removed.");
    }

    // --- DASHBOARD STATISTICS ---

    /**
     * Get total counts for the Admin Dashboard cards.
     */
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        long totalUsers = userRepository.count();
        
        // Count users with SELLER role
        long totalSellers = userRepository.findAll().stream()
                .filter(u -> "SELLER".equals(u.getRole()))
                .count();

        long totalProducts = productRepository.count();

        return ResponseEntity.ok(new DashboardStatsDTO(totalUsers, totalSellers, totalProducts));
    }
}