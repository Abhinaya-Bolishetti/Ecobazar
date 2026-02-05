package com.ecobazaar.backend.controller;

import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.service.ProductService;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // ✅ Upload product with image (SELLER only)
    @PreAuthorize("hasRole('SELLER')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product addProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("carbonImpact") double carbonImpact,
            @RequestParam("ecoCertified") boolean ecoCertified,
            @RequestParam("image") MultipartFile image
    ) throws Exception {
        return productService.addProduct(name, description, price, carbonImpact, ecoCertified, image);
    }

    // ✅ Public get products
    @GetMapping
    public java.util.List<Product> getAllProducts() {
        return productService.getAll();
    }
}
