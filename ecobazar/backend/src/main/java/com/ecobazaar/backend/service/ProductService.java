package com.ecobazaar.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ================= SELLER =================

    // ➕ Add product (AUTO-RATING + NEVER CERTIFIED)
    public Product addProduct(Product product) {

        double co2 = product.getCarbonImpact();

        // 🔹 Auto eco rating based on CO2
        String rating;
        if (co2 <= 2) rating = "A";
        else if (co2 <= 5) rating = "B";
        else if (co2 <= 8) rating = "C";
        else if (co2 <= 12) rating = "D";
        else rating = "E";

        product.setEcoRating(rating);

        // ❌ NEVER certified at creation
        product.setEcoCertified(false);

        return productRepository.save(product);
    }

    // ✏️ Update product (RECALCULATE RATING)
    public Product updateProduct(Long id, Product updatedProduct) {

        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setCarbonImpact(updatedProduct.getCarbonImpact());

        // 🔹 Recalculate rating if CO2 changed
        double co2 = updatedProduct.getCarbonImpact();
        String rating;
        if (co2 <= 2) rating = "A";
        else if (co2 <= 5) rating = "B";
        else if (co2 <= 8) rating = "C";
        else if (co2 <= 12) rating = "D";
        else rating = "E";

        product.setEcoRating(rating);

        // ❌ Reset certification if product updated
        product.setEcoCertified(false);

        return productRepository.save(product);
    }

    // ❌ Delete product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // ================= ADMIN =================

    // ✅ Approve product (STRICT RULES)
    public Product approveEcoProduct(Long id) {

        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        String rating = product.getEcoRating();

        // ❌ Grade C / D / E can NEVER be eco-certified
        if (rating == null ||
            rating.equalsIgnoreCase("C") ||
            rating.equalsIgnoreCase("D") ||
            rating.equalsIgnoreCase("E")) {

            product.setEcoCertified(false);  // stays NON-ECO ❌
            return productRepository.save(product);
        }

        // ✅ Only Grade A / B allowed
        product.setEcoCertified(true);
        return productRepository.save(product);
    }

    // ================= PUBLIC =================

    // 📦 Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 🔍 Get product by ID
    public Product getProductById(Long id) {
        return productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // 🔎 Search by name
    public List<Product> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    // 🧪 Filter by eco rating
    public List<Product> filterByEcoRating(String rating) {
        return productRepository.findByEcoRating(rating);
    }

    // 📉 Sort by lowest carbon footprint
    public List<Product> sortByCarbon() {
        return productRepository.findAllByOrderByCarbonImpactAsc();
    }
}
