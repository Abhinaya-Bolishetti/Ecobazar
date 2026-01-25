package com.ecobazaar.backend.dto;

public class AuthResponse {

    private String token;
    private String role;

    // ✅ No-args constructor (required by Spring)
    public AuthResponse() {}

    // ✅ New constructor (FIXES YOUR ERROR)
    public AuthResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    // ===== GETTERS & SETTERS =====
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
