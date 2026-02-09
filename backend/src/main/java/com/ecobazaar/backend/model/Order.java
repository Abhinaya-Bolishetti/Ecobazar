package com.ecobazaar.backend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private double totalAmount;
    private double totalCarbonImpact;

    // ✅ ADD THIS FIELD
    private String status; 

    private Date orderDate = new Date();

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public double getTotalCarbonImpact() { return totalCarbonImpact; }
    public void setTotalCarbonImpact(double totalCarbonImpact) { this.totalCarbonImpact = totalCarbonImpact; }

    // ✅ ADD THESE METHODS
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Date getOrderDate() { return orderDate; }
    public void setOrderDate(Date orderDate) { this.orderDate = orderDate; }
}