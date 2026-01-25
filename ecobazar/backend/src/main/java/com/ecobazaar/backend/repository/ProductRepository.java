package com.ecobazaar.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ecobazaar.backend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByEcoRating(String ecoRating);

    List<Product> findAllByOrderByCarbonImpactAsc();
}
