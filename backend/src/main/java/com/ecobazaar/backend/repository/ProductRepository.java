package com.ecobazaar.backend.repository;

import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // For main shop
    List<Product> findByStatus(String status);
    
   
    List<Product> findBySeller(User seller);
}