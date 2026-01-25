package com.ecobazaar.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableMethodSecurity
public class EcobazaarBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcobazaarBackendApplication.class, args);
    }
}
