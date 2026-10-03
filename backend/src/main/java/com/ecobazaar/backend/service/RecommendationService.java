package com.ecobazaar.backend.service;

import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired private ProductRepository productRepository;

    public List<Product> getGreenAlternatives(Long productId) {
        Product currentProduct = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return productRepository.findAll().stream()
                .filter(p -> p.getCategory() != null && p.getCategory().equals(currentProduct.getCategory()))
                .filter(p -> !p.getId().equals(productId))
                .filter(p -> p.getCarbonImpact() < currentProduct.getCarbonImpact())
                .limit(3)
                .collect(Collectors.toList());
    }
}