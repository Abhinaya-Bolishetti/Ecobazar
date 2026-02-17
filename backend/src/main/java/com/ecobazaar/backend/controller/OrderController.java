package com.ecobazaar.backend.controller;

import com.ecobazaar.backend.model.Order;
import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.service.OrderService;
import com.ecobazaar.backend.service.OrderHistoryService;
import org.springframework.http.ResponseEntity; // ✅ Added this import
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;
    private final OrderHistoryService orderHistoryService;

    public OrderController(OrderService orderService, OrderHistoryService orderHistoryService) {
        this.orderService = orderService;
        this.orderHistoryService = orderHistoryService;
    }

    @PostMapping("/place")
    public Order placeOrder(@RequestBody List<Product> cartProducts) {
        return orderService.placeOrder(cartProducts);
    }

    @GetMapping("/user")
    public List<Order> getMyOrders() {
        return orderHistoryService.getMyOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderDetails(id));
    }
}