package com.ecobazaar.backend.repository;

import com.ecobazaar.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // This MUST match the variable name in User.java
    Optional<User> findByUsername(String username);
}