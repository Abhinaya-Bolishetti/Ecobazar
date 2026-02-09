package com.ecobazaar.backend.repository;

import com.ecobazaar.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // ✅ This name must match your Service call and Model fields exactly
    List<Product> findByCarbonImpactLessThanAndEcoCertifiedTrue(Double carbonImpact);
    
    // Also include these for your Controller search/filter
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByEcoRatingGreaterThanEqual(int rating);
}