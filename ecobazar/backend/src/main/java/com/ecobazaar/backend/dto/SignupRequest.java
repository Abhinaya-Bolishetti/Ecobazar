package com.ecobazaar.backend.dto;

public class SignupRequest {

    private String username;
    private String email;
    private String password;
    private String confirmPassword;
    private String role; // USER / SELLER / ADMIN

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public String getRole() {
        return role;
    }

    // ===== SETTERS =====

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
 
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
