package com.ecobazaar.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(length = 1000)
    private String description;
    private double price;
    private double carbonImpact;
    private boolean ecoCertified = false;
    private String category; 
    private String status = "PENDING"; 

    @Column(length = 1000)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seller_id")
    // Prevents infinite loops if User also references Product
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    private User seller;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public User getSeller() { return seller; }
    public void setSeller(User seller) { this.seller = seller; }
}