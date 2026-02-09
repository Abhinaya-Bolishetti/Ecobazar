package com.ecobazaar.backend.controller;

import com.ecobazaar.backend.model.*;
import com.ecobazaar.backend.repository.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistItemRepository wishlistItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public WishlistController(WishlistItemRepository wishlistItemRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.wishlistItemRepository = wishlistItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @PostMapping("/add/{productId}")
    public void addToWishlist(@PathVariable Long productId) {
        // ✅ Changed 'email' to 'username' to match SecurityContext
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        if (!wishlistItemRepository.existsByUserAndProduct(user, product)) {
            WishlistItem item = new WishlistItem();
            item.setUser(user);
            item.setProduct(product);
            wishlistItemRepository.save(item);
        }
    }

    @GetMapping
    public List<Product> getWishlist() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return wishlistItemRepository.findByUser(user).stream()
                .map(WishlistItem::getProduct)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/remove/{productId}")
    public void remove(@PathVariable Long productId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        wishlistItemRepository.findByUser(user).stream()
            .filter(i -> i.getProduct().getId().equals(productId))
            .forEach(wishlistItemRepository::delete);
    }
}