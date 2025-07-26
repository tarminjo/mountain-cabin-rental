package com.example.backend.db;

import java.util.List;
import java.util.Map;

import com.example.backend.models.Rental;

public interface RentalRepositoryInteraface {
    
    int createRental(Map<String, String> payload);
    public int reservationsLast24Hours();
    public int reservationsLast7Days();
    public int reservationsLast30Days();
    public List<Rental> activeReservations(String username);
    public List<Rental> archivedReservations(String username);
    public int addRating(Map<String, String> payload);
    public List<Rental> getCabinRentalsWithRatings(String cabinId);
    public double getCabinAverageRating(String cabinId);
    public List<Rental> activeUnconfirmedReservations(String username);
}
