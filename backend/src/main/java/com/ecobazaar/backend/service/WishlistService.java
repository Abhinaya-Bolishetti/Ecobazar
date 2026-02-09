package com.ecobazaar.backend.service;

import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.repository.ProductRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WishlistService {

    private final ProductRepository productRepository;

    // username -> wishlist products
    private final Map<String, List<Product>> wishlists = new HashMap<>();

    public WishlistService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void add(Long productId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        wishlists.putIfAbsent(username, new ArrayList<>());
        wishlists.get(username).add(product);
    }

    public List<Product> getWishlist() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return wishlists.getOrDefault(username, new ArrayList<>());
    }

    public void remove(Long productId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        wishlists.getOrDefault(username, new ArrayList<>())
                .removeIf(p -> p.getId().equals(productId));
    }
}
