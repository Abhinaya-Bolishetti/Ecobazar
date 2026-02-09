package com.ecobazaar.backend.controller;

import com.ecobazaar.backend.model.*;
import com.ecobazaar.backend.repository.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    public OrderController(OrderRepository orderRepository, CartItemRepository cartItemRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }

 // Inside OrderController.java - The checkout method
    @PostMapping("/checkout")
    public Order checkout() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        
        // Aggregating Carbon and Price
        double totalPrice = cartItems.stream().mapToDouble(i -> i.getProduct().getPrice() * i.getQuantity()).sum();
        double totalCarbon = cartItems.stream().mapToDouble(i -> i.getProduct().getCarbonImpact() * i.getQuantity()).sum();

        Order order = new Order();
        order.setUser(user);
        order.setTotalPrice(totalPrice);
        order.setTotalCarbon(totalCarbon);
        
        Order savedOrder = orderRepository.save(order);
        cartItemRepository.deleteAll(cartItems); // Clear cart
        return savedOrder;
    }
    @GetMapping("/history")
    public List<Order> getHistory() {
        // ✅ Fixed the typos 'usernamel' and 'findByUsernamel'
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUser(user);
    }
}