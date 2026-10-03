package com.ecobazaar.backend.dto;

public class LoginRequest {
    private String username; // The backend uses this field for the email
    private String password;

    public LoginRequest() {}

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}