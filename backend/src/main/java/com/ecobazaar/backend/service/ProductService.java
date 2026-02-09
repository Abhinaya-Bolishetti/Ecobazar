package com.ecobazaar.backend.service;

import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.model.User;
import com.ecobazaar.backend.repository.ProductRepository;
import com.ecobazaar.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private final String UPLOAD_DIR = "uploads/";

    public ProductService(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Product addProduct(String name, String description, double price,
                             double carbonImpact, boolean ecoCertified,
                             MultipartFile image) throws Exception {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User seller = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        Files.createDirectories(Paths.get(UPLOAD_DIR));
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        Files.write(filePath, image.getBytes());

        Product p = new Product();
        p.setName(name);
        p.setDescription(description);
        p.setPrice(price);
        p.setCarbonImpact(carbonImpact);
        p.setEcoCertified(ecoCertified);
        p.setImageUrl("/uploads/" + fileName);
        
        // ✅ This will no longer be red if you updated the Product model
        p.setSeller(seller); 

        return productRepository.save(p);
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public Product updateProduct(Long id, Product updated) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        p.setName(updated.getName());
        p.setDescription(updated.getDescription());
        p.setPrice(updated.getPrice());
        p.setCarbonImpact(updated.getCarbonImpact());
        
        // ✅ Boolean getters in Java start with 'is', not 'get'
        p.setEcoCertified(updated.isEcoCertified()); 

        return productRepository.save(p);
    }

 // Inside ProductService.java
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    public List<Product> getGreenerAlternatives(Double maxCarbon) {
        // ✅ Matches the method name in ProductRepository
        return productRepository.findByCarbonImpactLessThanAndEcoCertifiedTrue(maxCarbon);
    }
}