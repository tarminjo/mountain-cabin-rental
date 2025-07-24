package com.example.backend.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.RentalRepository;

@RestController
@RequestMapping("/api/rentals")
@CrossOrigin("http://localhost:4200")
public class RentalController {
    
    @PostMapping
    public Map<String, String> createRental(@RequestBody Map<String, String> payload) {

        int result = new RentalRepository().createRental(payload);

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }

    @GetMapping("/reservations-last-24-hours")
    public Map<String, Integer> getReservationsLast24Hours() {

        int count = new RentalRepository().reservationsLast24Hours();

        Map<String, Integer> response = new HashMap<>();
        response.put("count", count);

        return response;
    }   

    @GetMapping("/reservations-last-7-days")
    public Map<String, Integer> getReservationsLast7Days() {

        int count = new RentalRepository().reservationsLast7Days();

        Map<String, Integer> response = new HashMap<>();
        response.put("count", count);

        return response;
    }

    @GetMapping("/reservations-last-30-days")
    public Map<String, Integer> getReservationsLast30Days() {
        
        int count = new RentalRepository().reservationsLast30Days();

        Map<String, Integer> response = new HashMap<>();
        response.put("count", count);

        return response;
    }

}
