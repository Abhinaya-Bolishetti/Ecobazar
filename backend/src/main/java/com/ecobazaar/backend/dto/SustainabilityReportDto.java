package com.ecobazaar.backend.dto;

import java.util.List;
import java.util.Map;

public class SustainabilityReportDto {
    private int totalOrders;
    private double totalCarbon;
    private double ecoPercentage;
    private String aiInsight;
    private List<String> recommendations;
    private Map<String, Double> monthlyCarbon;

    public int getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(int totalOrders) {
        this.totalOrders = totalOrders;
    }

    public double getTotalCarbon() {
        return totalCarbon;
    }

    public void setTotalCarbon(double totalCarbon) {
        this.totalCarbon = totalCarbon;
    }

    public double getEcoPercentage() {
        return ecoPercentage;
    }

    public void setEcoPercentage(double ecoPercentage) {
        this.ecoPercentage = ecoPercentage;
    }

    public String getAiInsight() {
        return aiInsight;
    }

    public void setAiInsight(String aiInsight) {
        this.aiInsight = aiInsight;
    }

    public List<String> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<String> recommendations) {
        this.recommendations = recommendations;
    }

    public Map<String, Double> getMonthlyCarbon() {
        return monthlyCarbon;
    }

    public void setMonthlyCarbon(Map<String, Double> monthlyCarbon) {
        this.monthlyCarbon = monthlyCarbon;
    }
}
