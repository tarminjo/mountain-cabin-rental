package com.example.backend.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
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
}
