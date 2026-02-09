package com.ecobazaar.backend.repository;

import com.ecobazaar.backend.model.CartItem;
import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    Optional<CartItem> findByUserAndProduct(User user, Product product);
}