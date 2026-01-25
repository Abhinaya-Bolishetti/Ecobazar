package com.ecobazaar.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;

    // CO2e per kg
    private double carbonImpact;

    private boolean ecoCertified;

    private String ecoRating; // A / B / C / D

    private Long sellerId;

    // ===== GETTERS & SETTERS =====
    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getCarbonImpact() { return carbonImpact; }
    public void setCarbonImpact(double carbonImpact) { this.carbonImpact = carbonImpact; }

    public boolean isEcoCertified() { return ecoCertified; }
    public void setEcoCertified(boolean ecoCertified) { this.ecoCertified = ecoCertified; }

    public String getEcoRating() { return ecoRating; }
    public void setEcoRating(String ecoRating) { this.ecoRating = ecoRating; }

    public Long getSellerId() { return sellerId; }
    public void setSellerId(Long sellerId) { this.sellerId = sellerId; }
}
