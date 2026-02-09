package com.ecobazaar.backend.service;

import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final ProductRepository productRepository;

    public RecommendationService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getGreenAlternatives(Long productId) {
        Product currentProduct = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Find items in same category with a lower carbon impact
        return productRepository.findAll().stream()
                .filter(p -> p.getCategory().equals(currentProduct.getCategory()))
                .filter(p -> p.getCarbonImpact() < currentProduct.getCarbonImpact())
                .filter(p -> !p.getId().equals(productId)) // Don't suggest the same item
                .limit(3)
                .collect(Collectors.toList());
    }
}