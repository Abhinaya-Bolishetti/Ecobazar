package com.ecobazaar.backend.service;

import com.ecobazaar.backend.model.Order;
import com.ecobazaar.backend.model.User;
import com.ecobazaar.backend.repository.OrderRepository;
import com.ecobazaar.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderHistoryService {

    private final OrderRepository orderRepo;
    private final UserRepository userRepo;

    public OrderHistoryService(OrderRepository orderRepo, UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    public List<Order> getMyOrders() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByUsername(username).orElseThrow();

        List<Order> orders = orderRepo.findByUser(user);

        // ✅ Force load items (important for JSON serialization)
        orders.forEach(o -> o.getItems().size());

        return orders;
    }
}
