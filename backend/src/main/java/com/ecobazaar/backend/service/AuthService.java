package com.ecobazaar.backend.service;

import com.ecobazaar.backend.dto.SignupRequest;
import com.ecobazaar.backend.model.User;
import com.ecobazaar.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(SignupRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        
        // Formats role for Spring Security (e.g., "ROLE_SELLER")
        String role = (request.getRole() != null) ? request.getRole().toUpperCase() : "USER";
        user.setRole("ROLE_" + role);
        
        return userRepository.save(user);
    }

    public boolean validatePassword(String raw, String encoded) {
        return encoder.matches(raw, encoded);
    }
}