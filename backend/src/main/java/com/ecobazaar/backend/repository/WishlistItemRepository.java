package com.ecobazaar.backend.repository;

import com.ecobazaar.backend.model.Product;
import com.ecobazaar.backend.model.User;
import com.ecobazaar.backend.model.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByUser(User user);
    boolean existsByUserAndProduct(User user, Product product);
}