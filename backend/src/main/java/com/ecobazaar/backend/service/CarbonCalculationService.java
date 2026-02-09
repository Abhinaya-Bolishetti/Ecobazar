package com.ecobazaar.backend.service;

import org.springframework.stereotype.Service;

@Service
public class CarbonCalculationService {

    /**
     * Calculates rating 1-5 based on Carbon Impact (CO2e/kg)
     * Lower carbon = Higher rating
     */
    public int calculateEcoRating(double carbonImpact, boolean isCertified) {
        int rating;

        if (carbonImpact <= 1.0) rating = 5;
        else if (carbonImpact <= 3.0) rating = 4;
        else if (carbonImpact <= 7.0) rating = 3;
        else if (carbonImpact <= 15.0) rating = 2;
        else rating = 1;

        // Certification bonus: Boost rating by 1 if eco-certified (max 5)
        if (isCertified && rating < 5) {
            rating++;
        }

        return rating;
    }
}