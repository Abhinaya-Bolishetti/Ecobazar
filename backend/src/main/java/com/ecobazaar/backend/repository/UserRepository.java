package com.ecobazaar.backend.repository;

import com.ecobazaar.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);  // ✅ correct
    Optional<User> findByEmail(String email);        // (already used in signup)
}
