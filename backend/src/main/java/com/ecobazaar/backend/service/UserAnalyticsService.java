package com.ecobazaar.backend.service;

import com.ecobazaar.backend.model.Order;
import com.ecobazaar.backend.repository.OrderRepository;
import com.ecobazaar.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class UserAnalyticsService {

    private final OrderRepository orderRepo;
    private final UserRepository userRepo;

    public UserAnalyticsService(OrderRepository orderRepo, UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    public Map<String, Object> getUserAnalytics() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepo.findByUsername(username).orElseThrow();

        List<Order> orders = orderRepo.findByUser(user);

        double totalCarbon = orders.stream()
                .mapToDouble(Order::getTotalCarbonImpact)
                .sum();

        Map<String, Double> monthly = new HashMap<>();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM");

        orders.forEach(o -> {
            String key = o.getOrderDate().format(fmt);
            monthly.put(key, monthly.getOrDefault(key, 0.0) + o.getTotalCarbonImpact());
        });

        Map<String, Object> res = new HashMap<>();
        res.put("totalOrders", orders.size());
        res.put("totalCarbon", totalCarbon);
        res.put("monthlyCarbon", monthly);

        return res;
    }

    public String generateCsvReport() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepo.findByUsername(username).orElseThrow();
        List<Order> orders = orderRepo.findByUser(user);

        StringBuilder sb = new StringBuilder("Date,OrderId,CarbonSaved\n");
        orders.forEach(o -> {
            sb.append(o.getOrderDate()).append(",")
              .append(o.getId()).append(",")
              .append(o.getTotalCarbonImpact()).append("\n");
        });
        return sb.toString();
    }
}
