package com.ecobazaar.backend.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // 🔐 FIXED SECRET KEY (minimum 32 characters required)
    private static final String SECRET_KEY =
            "ecobazaar-secret-key-ecobazaar-secret-key";

    // ⏳ Token validity: 1 day
    private static final long EXPIRATION_TIME = 86400000;

    // 🔑 Convert secret string into signing key
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // ================= CREATE TOKEN =================
    public String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)                 // store username
                .setIssuedAt(new Date())               // token creation time
                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION_TIME)
                )                                       // expiry time
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ================= READ USERNAME =================
    public String extractUsername(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // ================= VALIDATE TOKEN =================
    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
