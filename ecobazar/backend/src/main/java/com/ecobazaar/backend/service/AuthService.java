package com.ecobazaar.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecobazaar.backend.dto.SignupRequest;
import com.ecobazaar.backend.model.User;
import com.ecobazaar.backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ================= SIGNUP =================
    public User register(SignupRequest request) {

        // 1️⃣ Password confirmation
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        // 2️⃣ Username uniqueness
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // 3️⃣ Email uniqueness
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // 4️⃣ Role validation
        String role = request.getRole();
        if (role == null || role.isBlank()) {
            role = "USER"; // default role
        }

        if (!role.equals("USER") &&
            !role.equals("SELLER") &&
            !role.equals("ADMIN")) {

            throw new RuntimeException("Invalid role selected");
        }

        // 5️⃣ Create user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole(role);

        // 6️⃣ Save to database
        return userRepository.save(user);
    }

    // ================= LOGIN =================
    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return encoder.matches(rawPassword, encodedPassword);
    }
}
