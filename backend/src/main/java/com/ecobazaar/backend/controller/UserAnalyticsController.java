package com.ecobazaar.backend.controller;

import com.ecobazaar.backend.service.UserAnalyticsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user/analytics")
public class UserAnalyticsController {

    private final UserAnalyticsService analyticsService;

    public UserAnalyticsController(UserAnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping
    public Map<String, Object> getUserAnalytics() {
        return analyticsService.getUserAnalytics();
    }

    @GetMapping("/report")
    public String downloadReport() {
        return analyticsService.generateCsvReport();
    }
}
