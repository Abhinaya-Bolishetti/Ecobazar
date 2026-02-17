package com.ecobazaar.backend.dto;

public class DashboardStatsDTO {
    private long totalUsers;
    private long totalSellers;
    private long totalProducts;

    public DashboardStatsDTO(long totalUsers, long totalSellers, long totalProducts) {
        this.totalUsers = totalUsers;
        this.totalSellers = totalSellers;
        this.totalProducts = totalProducts;
    }

    // Getters and Setters
    public long getTotalUsers() { return totalUsers; }
    public long getTotalSellers() { return totalSellers; }
    public long getTotalProducts() { return totalProducts; }
}