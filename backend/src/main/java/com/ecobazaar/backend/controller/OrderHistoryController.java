package com.ecobazaar.backend.controller;

import com.ecobazaar.backend.model.Order;
import com.ecobazaar.backend.service.OrderHistoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/orders")
public class OrderHistoryController {

    private final OrderHistoryService orderHistoryService;

    public OrderHistoryController(OrderHistoryService orderHistoryService) {
        this.orderHistoryService = orderHistoryService;
    }

    @GetMapping
    public List<Order> getMyOrders() {
        return orderHistoryService.getMyOrders();
    }
}
