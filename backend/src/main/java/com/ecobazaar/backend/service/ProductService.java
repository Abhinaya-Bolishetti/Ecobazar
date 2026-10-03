package com.ecobazaar.backend.service;

import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.model.User;
import com.ecobazaar.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired private ProductRepository productRepo;
    @Autowired private WishlistItemRepository wishlistItemRepo;
    @Autowired private CartItemRepository cartItemRepo;

    public List<Product> getApprovedProducts() {
        return productRepo.findByStatus("APPROVED");
    }

    public List<Product> getProductsBySeller(User seller) {
        return productRepo.findBySeller(seller);
    }

    public Product save(Product product) {
        if (product.getStatus() == null) product.setStatus("PENDING");
        return productRepo.save(product);
    }

    public Optional<Product> getProductById(Long id) {
        return productRepo.findById(id);
    }

    public Product getById(Long id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Transactional
    public void delete(Long id) {
        Product product = getById(id);
        // Clean up dependencies first
        wishlistItemRepo.deleteByProduct(product);
        cartItemRepo.deleteByProduct(product);
        productRepo.delete(product);
    }

    public Product updateProduct(Long id, Product details) {
        Product product = getById(id);
        product.setName(details.getName());
        product.setDescription(details.getDescription());
        product.setPrice(details.getPrice());
        product.setCarbonImpact(details.getCarbonImpact());
        product.setCategory(details.getCategory());
        // Ensure this boolean is in your Model
        product.setEcoCertified(details.isEcoCertified()); 
        return productRepo.save(product);
    }
}