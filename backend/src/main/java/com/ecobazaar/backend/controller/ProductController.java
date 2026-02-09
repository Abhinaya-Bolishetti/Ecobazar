package com.ecobazaar.backend.controller;

import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.repository.ProductRepository;
import com.ecobazaar.backend.service.CarbonCalculationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductRepository productRepository;
    private final CarbonCalculationService carbonService;

    public ProductController(ProductRepository productRepository, CarbonCalculationService carbonService) {
        this.productRepository = productRepository;
        this.carbonService = carbonService;
    }

    @GetMapping
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    // ✅ Milestone 2: Add Product with Eco-Rating
    @PostMapping
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        int rating = carbonService.calculateEcoRating(product.getCarbonImpact(), product.isEcoCertified());
        product.setEcoRating(rating);
        return ResponseEntity.ok(productRepository.save(product));
    }

    // ✅ Product Discovery: Search by Name
    @GetMapping("/search")
    public List<Product> search(@RequestParam String query) {
        return productRepository.findByNameContainingIgnoreCase(query);
    }

    // ✅ Eco-rating & Filtering
    @GetMapping("/filter")
    public List<Product> filterByEco(@RequestParam int minRating) {
        return productRepository.findByEcoRatingGreaterThanEqual(minRating);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.ok("Product removed");
    }
}