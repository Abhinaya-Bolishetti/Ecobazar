package com.ecobazaar.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 2000)
    private String description;

    private Double price;

    private Double carbonImpact;

    private Boolean ecoCertified;

    @Column(name = "image_url")
    private String imageUrl;

    // relationship to seller
    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String getDescription() {
        return description;
    }
 
    public void setDescription(String description) {
        this.description = description;
    }
 
    public Double getPrice() {
        return price;
    }
 
    public void setPrice(Double price) {
        this.price = price;
    }
 
    public Double getCarbonImpact() {
        return carbonImpact;
    }
 
    public void setCarbonImpact(Double carbonImpact) {
        this.carbonImpact = carbonImpact;
    }
 
    public Boolean getEcoCertified() {
        return ecoCertified;
    }
 
    public void setEcoCertified(Boolean ecoCertified) {
        this.ecoCertified = ecoCertified;
    }

    public String getImageUrl() {
        return imageUrl;
    }
 
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public User getSeller() {
        return seller;
    }
 
    public void setSeller(User seller) {
        this.seller = seller;
    }
}
