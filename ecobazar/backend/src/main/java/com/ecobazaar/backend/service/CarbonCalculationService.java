package com.ecobazaar.backend.service;

import org.springframework.stereotype.Service;

@Service
public class CarbonCalculationService {

    // ✅ FULL eco rating logic (A → E)
    public String calculateEcoRating(double carbonImpact) {

        if (carbonImpact <= 2)  return "A";
        if (carbonImpact <= 5)  return "B";
        if (carbonImpact <= 8)  return "C";
        if (carbonImpact <= 12) return "D";

        return "E";  // 👈 Anything above 12 is WORST eco rating
    }
}
