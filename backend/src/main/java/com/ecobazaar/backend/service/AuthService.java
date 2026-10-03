package com.ecobazaar.backend.service;

import com.ecobazaar.backend.dto.SignupRequest;
import com.ecobazaar.backend.model.User;
import com.ecobazaar.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Fixes the error in AuthController
    public User registerUser(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("Email is already registered!");
        }

        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        
        // Hash the password before saving!
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        
        user.setRole(signupRequest.getRole());
        user.setStatus("PENDING"); // Required for Milestone 4 Admin Dashboard

        return userRepository.save(user);
    }

    

    public boolean validatePassword(String rawPassword, String encodedPassword) {
        // passwordEncoder.matches(raw, hashed) is the ONLY way to check BCrypt
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}