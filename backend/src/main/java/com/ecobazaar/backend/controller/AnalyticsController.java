package com.ecobazaar.backend.controller;

import com.ecobazaar.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:3000") // Ensure CORS is allowed
public class AnalyticsController {

    @Autowired
    private ReportService reportService;

    // ✅ FIXED: Added the endpoint your React Chart is calling
    @GetMapping("/leaderboard")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Object[]>> getLeaderboardData() {
        return ResponseEntity.ok(reportService.getLeaderboardStats());
    }

    @GetMapping("/download-report")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<byte[]> downloadReport() {
        String csvData = reportService.generateCsvReport();
        byte[] csvBytes = csvData.getBytes();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=eco_report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csvBytes);
    }
}