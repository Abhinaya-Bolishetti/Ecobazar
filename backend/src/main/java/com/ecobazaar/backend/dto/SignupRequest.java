package com.ecobazaar.backend.dto;

public class SignupRequest {

    private String username;
    private String email;
    private String password;
    private String confirmPassword;
    private String role;   // USER or SELLER

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getRole() {        // ✅ required
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
