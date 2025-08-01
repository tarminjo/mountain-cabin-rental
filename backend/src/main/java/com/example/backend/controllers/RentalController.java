package com.example.backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.RentalRepository;
import com.example.backend.models.Rental;


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
        } else if (result == -1) {
            response.put("message", "taken");
        } else {
            response.put("message", "error");
        }
        return response;
    }

    @GetMapping("/reservations-last-24-hours")
    public int getReservationsLast24Hours() {

        return new RentalRepository().reservationsLast24Hours();
    }

    @GetMapping("/reservations-last-7-days")
    public int getReservationsLast7Days() {

        return new RentalRepository().reservationsLast7Days();
    }

    @GetMapping("/reservations-last-30-days")
    public int getReservationsLast30Days() {

        return new RentalRepository().reservationsLast30Days();
    }

    @GetMapping("/active/{username}")
    public List<Rental> getActiveReservations(@PathVariable String username) {
        return new RentalRepository().activeReservations(username);
    }

    @GetMapping("/archive/{username}")
    public List<Rental> getReservationsArchive(@PathVariable String username) {
        return new RentalRepository().archivedReservations(username);
    }

    @PostMapping("/rating")
    public Map<String, String> addRating(@RequestBody Map<String, String> payload) {

        int result = new RentalRepository().addRating(payload);

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }

    @GetMapping("/cabin/{cabinId}")
    public List<Rental> getCabinRentalsWithRatings(@PathVariable String cabinId) {
        return new RentalRepository().getCabinRentalsWithRatings(cabinId);
    }

    @GetMapping("/average-rating/{cabinId}")
    public double getCabinAverageRating(@PathVariable String cabinId) {
        return new RentalRepository().getCabinAverageRating(cabinId);
    }

    @GetMapping("/cancel/{id}")
    public Map<String, String> cancelReservation(@PathVariable int id) {

        int result = new RentalRepository().cancelReservation(id);

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }

    @GetMapping("/active-unconfirmed/{username}")
    public List<Rental> getActiveUnconfirmedReservations(@PathVariable String username) {
        return new RentalRepository().activeUnconfirmedReservations(username);
    }

    @PostMapping("/reject")
    public Map<String, String> rejectReservation(@RequestBody Map<String, String> payload) {

        int result = new RentalRepository().rejectReservation(payload);

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }

    @GetMapping("/accept/{rentalId}")
    public Map<String, String> acceptReservation(@PathVariable int rentalId) {

        int result = new RentalRepository().acceptReservation(rentalId);

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }

}
