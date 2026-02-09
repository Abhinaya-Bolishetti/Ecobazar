package com.ecobazaar.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private double totalPrice;
    private double totalCarbon; // Milestone 3: Sustainability Insight
    private LocalDateTime orderDate = LocalDateTime.now();

    // Getters and Setters
    public void setUser(User user) { this.user = user; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
    public void setTotalCarbon(double totalCarbon) { this.totalCarbon = totalCarbon; }
    public Long getId() { return id; }
    public double getTotalPrice() { return totalPrice; }
    public double getTotalCarbon() { return totalCarbon; }
}