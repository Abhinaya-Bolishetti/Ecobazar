package com.ecobazaar.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecobazaar.backend.dto.AuthResponse;
import com.ecobazaar.backend.dto.LoginRequest;
import com.ecobazaar.backend.dto.SignupRequest;
import com.ecobazaar.backend.model.User;
import com.ecobazaar.backend.repository.UserRepository;
import com.ecobazaar.backend.security.JwtUtil;
import com.ecobazaar.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService,
                          UserRepository userRepository,
                          JwtUtil jwtUtil) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // ================= SIGNUP =================
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        authService.register(request);
        return ResponseEntity.ok("User Registered Successfully");
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userRepository
                .findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(401).body("User not found");
        }

        if (!authService.validatePassword(
                request.getPassword(),
                user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    // ================= TOKEN TEST =================
    @GetMapping("/test")
    public ResponseEntity<?> testToken(
            @RequestHeader("Authorization") String authHeader) {

        // Remove "Bearer "
        String token = authHeader.substring(7);

        // Extract username from token
        String username = jwtUtil.extractUsername(token);

        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null) {
            return ResponseEntity.status(401).body("User not found");
        }

        return ResponseEntity.ok(
                "Username: " + user.getUsername() +
                ", Email: " + user.getEmail() +
                ", Role: " + user.getRole()
        );
    }
}
