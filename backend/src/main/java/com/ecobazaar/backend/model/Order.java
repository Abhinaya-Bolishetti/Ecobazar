package com.ecobazaar.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many orders belong to one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore   // ✅ Prevent infinite JSON loop when returning orders
    private User user;

    private double totalPrice;

    // Standardized carbon field
    @Column(name = "total_carbon_impact")
    private double totalCarbonImpact;

    private LocalDateTime orderDate = LocalDateTime.now();

    private String status = "PENDING";

    // Order has multiple items
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id") // creates FK in order_items table
    private List<OrderItem> items;

    // ---- Getters & Setters ----

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public double getTotalCarbonImpact() {
        return totalCarbonImpact;
    }

    public void setTotalCarbonImpact(double totalCarbonImpact) {
        this.totalCarbonImpact = totalCarbonImpact;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}
