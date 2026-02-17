package com.ecobazaar.backend.service;

import com.ecobazaar.backend.repository.ProductRepository;
import com.ecobazaar.backend.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private ProductRepository productRepo;

    // Leaderboard data [Name, Impact]
    public List<Object[]> getLeaderboardStats() {
        return productRepo.findByStatus("APPROVED")
                .stream()
                .map(p -> new Object[]{ p.getName(), p.getCarbonImpact() })
                .collect(Collectors.toList());
    }

    // 🧠 AI Summary (Rule-based AI)
    public String generateAiSummary() {
        List<Product> all = productRepo.findAll();
        long total = all.size();
        long ecoCertified = all.stream().filter(Product::isEcoCertified).count();

        double avgImpact = all.stream()
                .mapToDouble(Product::getCarbonImpact)
                .average()
                .orElse(0);

        String trend;
        if (avgImpact < 10) {
            trend = "Overall carbon impact is low, indicating strong adoption of eco-friendly products.";
        } else if (avgImpact < 25) {
            trend = "Platform shows moderate sustainability with room for improvement in product carbon impact.";
        } else {
            trend = "High average carbon impact detected. Recommend increasing eco-certified product listings.";
        }

        return "AI Summary: Out of " + total + " products, " + ecoCertified +
                " are eco-certified. Average carbon impact is " + String.format("%.2f", avgImpact) +
                " kg CO₂. " + trend;
    }


    // 📄 AI-powered CSV report
    public String generateCsvReport() {
        StringBuilder csv = new StringBuilder();

        // ✅ Add AI Summary at top
        csv.append(generateAiSummary()).append("\n\n");
        csv.append("Product Name,Carbon Impact (kg),Eco Certified\n");

        productRepo.findAll().forEach(p -> 
            csv.append(p.getName()).append(",")
               .append(p.getCarbonImpact()).append(",")
               .append(p.isEcoCertified() ? "Yes" : "No")
               .append("\n")
        );
        return csv.toString();
    }
}
