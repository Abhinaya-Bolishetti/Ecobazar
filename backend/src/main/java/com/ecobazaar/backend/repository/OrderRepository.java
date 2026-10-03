package com.ecobazaar.backend.repository;

import com.ecobazaar.backend.model.Order;
import com.ecobazaar.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // This allows OrderHistoryService to filter by the logged-in user
    List<Order> findByUser(User user);
}