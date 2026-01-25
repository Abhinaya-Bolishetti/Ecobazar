package com.ecobazaar.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // ================= SELLER =================

    // ➕ Add product (SELLER ONLY)
    @PostMapping
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.addProduct(product));
    }

    // ✏️ Update product (SELLER ONLY)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    // ❌ Delete product (SELLER ONLY)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }

    // ================= ADMIN =================

    // ✅ Approve eco-certified product (ADMIN ONLY)
    @PutMapping("/approve/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Product> approveEcoProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.approveEcoProduct(id));
    }


    // ================= PUBLIC =================

    // 📦 View all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // 🔍 View product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // 🔎 Search by name
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchByName(@RequestParam String name) {
        return ResponseEntity.ok(productService.searchByName(name));
    }

    // 🧪 Filter by eco rating
    @GetMapping("/filter")
    public ResponseEntity<List<Product>> filterByEcoRating(@RequestParam String rating) {
        return ResponseEntity.ok(productService.filterByEcoRating(rating));
    }

    // 📉 Sort by lowest carbon footprint
    @GetMapping("/sort/carbon")
    public ResponseEntity<List<Product>> sortByCarbonImpact() {
        return ResponseEntity.ok(productService.sortByCarbon());
    }
}
