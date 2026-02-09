package com.ecobazaar.backend.controller;

import com.ecobazaar.backend.model.*;
import com.ecobazaar.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired private CartItemRepository cartRepo;
    @Autowired private OrderRepository orderRepo;
    @Autowired private UserRepository userRepo;

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(Principal principal) {
        User user = userRepo.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<CartItem> items = cartRepo.findByUser(user);
        if (items.isEmpty()) return ResponseEntity.badRequest().body("Cart is empty");

        double totalCarbon = items.stream()
                .mapToDouble(i -> i.getProduct().getCarbonImpact() * i.getQuantity()).sum();
        double totalAmt = items.stream()
                .mapToDouble(i -> i.getProduct().getPrice() * i.getQuantity()).sum();

        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(totalAmt);
        order.setTotalCarbonImpact(totalCarbon);
        
        // ✅ This will now work because of the changes in Order.java
        order.setStatus("PLACED"); 
        
        Order savedOrder = orderRepo.save(order);
        cartRepo.deleteAll(items);

        return ResponseEntity.ok(Map.of(
            "orderId", savedOrder.getId(),
            "totalCarbon", totalCarbon,
            "totalAmount", totalAmt,
            "status", savedOrder.getStatus()
        ));
    }
}