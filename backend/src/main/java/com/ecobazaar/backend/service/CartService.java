package com.ecobazaar.backend.service;

import com.ecobazaar.backend.model.*;
import com.ecobazaar.backend.repository.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartService(CartItemRepository cartItemRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public void add(Long productId) {
        // ✅ Get username from security context
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        cartItemRepository.findByUserAndProduct(user, product).ifPresentOrElse(
            item -> {
                item.setQuantity(item.getQuantity() + 1);
                cartItemRepository.save(item);
            },
            () -> {
                CartItem newItem = new CartItem();
                newItem.setUser(user);
                newItem.setProduct(product);
                newItem.setQuantity(1);
                cartItemRepository.save(newItem);
            }
        );
    }

    @Transactional
    public void remove(Long productId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();
        cartItemRepository.findByUserAndProduct(user, product).ifPresent(cartItemRepository::delete);
    }

    public List<CartItem> getCartItems() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        return cartItemRepository.findByUser(user);
    }
}