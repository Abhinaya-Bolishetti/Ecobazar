package com.ecobazaar.backend.service;

import com.ecobazaar.backend.dto.SustainabilityReportDto;
import com.ecobazaar.backend.model.Order;
import com.ecobazaar.backend.model.User;
import com.ecobazaar.backend.repository.OrderRepository;
import com.ecobazaar.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.format.TextStyle;
import java.util.*;

@Service
public class SustainabilityReportService {

    private final OrderRepository orderRepo;
    private final UserRepository userRepo;

    public SustainabilityReportService(OrderRepository orderRepo, UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    public SustainabilityReportDto generateMyReport() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByUsername(username).orElseThrow();

        List<Order> orders = orderRepo.findByUser(user);

        SustainabilityReportDto dto = new SustainabilityReportDto();
        dto.setTotalOrders(orders.size());

        double totalCarbon = orders.stream()
                .mapToDouble(Order::getTotalCarbonImpact)
                .sum();

        dto.setTotalCarbon(totalCarbon);

        // Monthly carbon aggregation
        Map<String, Double> monthly = new LinkedHashMap<>();
        for (Order o : orders) {
            String month = o.getOrderDate()
                    .getMonth()
                    .getDisplayName(TextStyle.SHORT, Locale.ENGLISH);

            monthly.put(month,
                    monthly.getOrDefault(month, 0.0) + o.getTotalCarbonImpact());
        }
        dto.setMonthlyCarbon(monthly);

        // AI Insight (Rule-based AI)
        String insight;
        if (totalCarbon < 10) {
            insight = "Excellent sustainability performance! Your purchases are highly eco-friendly.";
        } else if (totalCarbon < 30) {
            insight = "Good job! You are making greener choices, but there is room to improve.";
        } else {
            insight = "Your carbon footprint is relatively high. Consider switching to more eco-certified products.";
        }
        dto.setAiInsight(insight);

        // Recommendations (static + logic-based)
        List<String> recs = new ArrayList<>();
        recs.add("Prefer eco-certified products when available");
        recs.add("Choose reusable alternatives over single-use plastics");
        recs.add("Filter products by low carbon impact before checkout");

        dto.setRecommendations(recs);

        // Simple eco percentage estimation (AI-style metric)
        double ecoPercentage = orders.isEmpty() ? 0 : Math.min(100, (orders.size() * 10));
        dto.setEcoPercentage(ecoPercentage);

        return dto;
    }
}
