package com.ecobazaar.backend.controller;

import com.ecobazaar.backend.dto.SustainabilityReportDto;
import com.ecobazaar.backend.service.SustainabilityReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000")
public class SustainabilityReportController {

    private final SustainabilityReportService reportService;

    public SustainabilityReportController(SustainabilityReportService reportService) {
        this.reportService = reportService;
    }

    // USER: AI Sustainability Reporter
    @GetMapping("/sustainability")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<SustainabilityReportDto> getMySustainabilityReport() {
        return ResponseEntity.ok(reportService.generateMyReport());
    }
}
