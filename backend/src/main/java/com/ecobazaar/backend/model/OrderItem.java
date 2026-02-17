package com.ecobazaar.backend.model;

import jakarta.persistence.*;

@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private int quantity;
    private double price;
    private double carbonImpact; // To track individual impact per item

    // Getters and Setters
    public Long getId() { return id; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public double getCarbonImpact() { return carbonImpact; }
    public void setCarbonImpact(double carbonImpact) { this.carbonImpact = carbonImpact; }
}