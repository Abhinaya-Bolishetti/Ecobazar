package com.ecobazaar.backend.service;

import com.ecobazaar.backend.model.*;
import com.ecobazaar.backend.repository.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final UserRepository userRepo;

    public OrderService(OrderRepository orderRepo, UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    public Order placeOrder(List<Product> cartProducts) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByUsername(username).orElseThrow();

        // Sum up totals from the frontend data
        double totalPrice = cartProducts.stream().mapToDouble(Product::getPrice).sum();
        double totalCarbon = cartProducts.stream().mapToDouble(Product::getCarbonImpact).sum();

        Order order = new Order();
        order.setUser(user); // Important for "My Orders" visibility
        order.setTotalPrice(totalPrice);
        order.setTotalCarbonImpact(totalCarbon);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PLACED");

        List<OrderItem> items = cartProducts.stream().map(p -> {
            OrderItem oi = new OrderItem();
            oi.setProductName(p.getName());
            oi.setQuantity(1);
            oi.setPrice(p.getPrice());
            oi.setCarbonImpact(p.getCarbonImpact());
            return oi;
        }).collect(Collectors.toList());

        order.setItems(items);
        return orderRepo.save(order);
    }
public Order getOrderDetails(Long id) {
    return orderRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found"));
}}