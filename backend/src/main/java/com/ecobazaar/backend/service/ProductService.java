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

    public ProductService(ProductRepository productRepository,
                          UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Product addProduct(String name, String description, double price,
                              double carbonImpact, boolean ecoCertified,
                              MultipartFile image) throws Exception {

        // get logged in seller
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User seller = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        // save image
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
        p.setSeller(seller);

        return productRepository.save(p);
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }
}
