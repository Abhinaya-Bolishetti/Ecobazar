package com.ecobazaar.backend.repository;

import com.ecobazaar.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; 
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    
    // ✅ Powers Admin Dashboard Seller table
    List<User> findByRoleAndStatus(String role, String status);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    
    
    List<User> findByStatus(String status);
}