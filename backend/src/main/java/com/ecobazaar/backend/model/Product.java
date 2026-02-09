package com.ecobazaar.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
	// Inside Product.java
	private int ecoRating;

	public int getEcoRating() { return ecoRating; }
	public void setEcoRating(int ecoRating) { this.ecoRating = ecoRating; }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private double carbonImpact;
    private boolean ecoCertified;
    private String imageUrl;
    private String category;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    // ✅ GETTERS (Fixes: updated.getName, updated.getDescription, etc.)
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public double getPrice() { return price; }
    public double getCarbonImpact() { return carbonImpact; }
    public boolean isEcoCertified() { return ecoCertified; }
    public String getImageUrl() { return imageUrl; }
    public String getCategory() { return category; }
    public User getSeller() { return seller; }

    // ✅ SETTERS (Fixes: p.setName, p.setDescription, p.setPrice, etc.)
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(double price) { this.price = price; }
    public void setCarbonImpact(double carbonImpact) { this.carbonImpact = carbonImpact; }
    public void setEcoCertified(boolean ecoCertified) { this.ecoCertified = ecoCertified; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setCategory(String category) { this.category = category; }
    public void setSeller(User seller) { this.seller = seller; }
}
