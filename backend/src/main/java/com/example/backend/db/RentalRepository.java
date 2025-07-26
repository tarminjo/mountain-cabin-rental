package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.backend.models.Rental;

public class RentalRepository implements RentalRepositoryInteraface {

    @Override
    public int createRental(Map<String, String> payload) {
        
        try (Connection conn = DB.source().getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                 "INSERT INTO rentals (createdAt, cabinId, cabinName, cabinLocation, user, startDate, endDate, adults, children, description, status, price) " +
                 "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
            String formatted = now.format(formatter);

            stmt.setTimestamp(1, Timestamp.valueOf(parseDateToDatabase(formatted)));
            stmt.setInt(2, Integer.parseInt(payload.get("cabinId")));
            stmt.setString(3, payload.get("cabinName"));
            stmt.setString(4, payload.get("cabinLocation"));
            stmt.setString(5, payload.get("user"));
            stmt.setTimestamp(6, Timestamp.valueOf(parseDateToDatabase(payload.get("startDate"))));
            stmt.setTimestamp(7, Timestamp.valueOf(parseDateToDatabase(payload.get("endDate"))));
            stmt.setInt(8, Integer.parseInt(payload.get("adults")));
            stmt.setInt(9, Integer.parseInt(payload.get("children")));
            stmt.setString(10, payload.get("description"));
            stmt.setInt(11, 0); // Status 0 - created by tourist, not yet confirmed by owner
            stmt.setDouble(12, Double.parseDouble(payload.get("price")));

            try (PreparedStatement checkStmt = conn.prepareStatement(
                 "SELECT COUNT(*) FROM rentals WHERE cabinId = ? AND NOT (endDate < ? OR startDate > ?)")) {

                checkStmt.setInt(1, Integer.parseInt(payload.get("cabinId")));
                checkStmt.setTimestamp(2, Timestamp.valueOf(parseDateToDatabase(payload.get("endDate"))));
                checkStmt.setTimestamp(3, Timestamp.valueOf(parseDateToDatabase(payload.get("startDate"))));

                ResultSet rs = checkStmt.executeQuery();
                if (rs.next() && rs.getInt(1) > 0) {
                    return -1; // Rental already exists for this cabin in the given date range
                } else {
                    int rows = stmt.executeUpdate();
                    
                    if (rows > 0) {
                        return 1;
                    }
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
        
        return 0;
    }

    @Override
    public int reservationsLast24Hours() {
        try (Connection conn = DB.source().getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                 "SELECT COUNT(*) FROM rentals WHERE createdAt >= NOW() - INTERVAL 1 DAY AND (status = 1 OR status = 0)")) {

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getInt(1);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int reservationsLast7Days() {
        try (Connection conn = DB.source().getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                 "SELECT COUNT(*) FROM rentals WHERE createdAt >= NOW() - INTERVAL 7 DAY AND (status = 1 OR status = 0)")) {

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getInt(1);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int reservationsLast30Days() {
        try (Connection conn = DB.source().getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                 "SELECT COUNT(*) FROM rentals WHERE createdAt >= NOW() - INTERVAL 30 DAY AND (status = 1 OR status = 0)")) {

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getInt(1);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    private LocalDateTime parseDateToDatabase(String dateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        return LocalDateTime.parse(dateStr, formatter);
    }

    @Override
    public List<Rental> activeReservations(String username) {

        List<Rental> rentals = new ArrayList<>();

        try (Connection conn = DB.source().getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                 "SELECT * FROM rentals WHERE user = ? AND endDate >= NOW() AND (status = 1 OR status = 0)")) {

            //TODO: Add status logic - cancelled, completed, etc.

            stmt.setString(1, username);
            
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {

                Rental rental = new Rental();

                rental.setId(rs.getInt("id"));
                rental.setCreatedAt(rs.getTimestamp("createdAt"));
                rental.setCabinId(rs.getInt("cabinId"));
                rental.setCabinName(rs.getString("cabinName"));
                rental.setCabinLocation(rs.getString("cabinLocation"));
                rental.setUser(rs.getString("user"));
                rental.setStartDate(rs.getTimestamp("startDate"));
                rental.setEndDate(rs.getTimestamp("endDate"));
                rental.setAdults(rs.getInt("adults"));
                rental.setChildren(rs.getInt("children"));
                rental.setDescription(rs.getString("description"));
                rental.setComment(rs.getString("comment"));
                rental.setRating(rs.getInt("rating"));
                rental.setStatus(rs.getInt("status"));
                rental.setPrice(rs.getInt("price"));
                
                rentals.add(rental);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rentals;
    }

    @Override
    public List<Rental> archivedReservations(String username) {
        List<Rental> rentals = new ArrayList<>();

        try (Connection conn = DB.source().getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                 "SELECT * FROM rentals WHERE user = ? AND endDate < NOW() AND status = 2")) {

            //TODO: Add status logic - cancelled, completed, etc.

            stmt.setString(1, username);
            
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {

                Rental rental = new Rental();

                rental.setId(rs.getInt("id"));
                rental.setCreatedAt(rs.getTimestamp("createdAt"));
                rental.setCabinId(rs.getInt("cabinId"));
                rental.setCabinName(rs.getString("cabinName"));
                rental.setCabinLocation(rs.getString("cabinLocation"));
                rental.setUser(rs.getString("user"));
                rental.setStartDate(rs.getTimestamp("startDate"));
                rental.setEndDate(rs.getTimestamp("endDate"));
                rental.setAdults(rs.getInt("adults"));
                rental.setChildren(rs.getInt("children"));
                rental.setDescription(rs.getString("description"));
                rental.setComment(rs.getString("comment"));
                rental.setRating(rs.getInt("rating"));
                rental.setStatus(rs.getInt("status"));
                rental.setPrice(rs.getInt("price"));

                rentals.add(rental);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rentals;
    }

    @Override
    public int addRating(Map<String, String> payload) {

        int rating = Integer.parseInt(payload.get("rating"));
        String comment = payload.get("comment");
        int id = Integer.parseInt(payload.get("id"));

        try (Connection conn = DB.source().getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                 "UPDATE rentals SET rating = ?, comment = ? WHERE id = ? AND status = 2")) {

            stmt.setInt(1, rating);
            stmt.setString(2, comment);
            stmt.setInt(3, id);

            return stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }

    @Override
    public List<Rental> getCabinRentalsWithRatings(String cabinId) {

        List<Rental> rentals = new ArrayList<>();
        
        try (Connection conn = DB.source().getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                 "SELECT * FROM rentals WHERE cabinId = ?")) {

            stmt.setString(1, cabinId);

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                if(rs.getInt("rating") > 0){

                    Rental rental = new Rental();

                    rental.setId(rs.getInt("id"));
                    rental.setCreatedAt(rs.getTimestamp("createdAt"));
                    rental.setCabinId(rs.getInt("cabinId"));
                    rental.setCabinName(rs.getString("cabinName"));
                    rental.setCabinLocation(rs.getString("cabinLocation"));
                    rental.setUser(rs.getString("user"));
                    rental.setStartDate(rs.getTimestamp("startDate"));
                    rental.setEndDate(rs.getTimestamp("endDate"));
                    rental.setAdults(rs.getInt("adults"));
                    rental.setChildren(rs.getInt("children"));
                    rental.setDescription(rs.getString("description"));
                    rental.setComment(rs.getString("comment"));
                    rental.setRating(rs.getInt("rating"));
                    rental.setStatus(rs.getInt("status"));
                    rental.setPrice(rs.getInt("price"));

                    rentals.add(rental);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rentals;
    }

    @Override
    public double getCabinAverageRating(String cabinId) {

        double averageRating = 0.0;

        try (Connection conn = DB.source().getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                 "SELECT AVG(rating) FROM rentals WHERE cabinId = ? and rating > 0")) {

            stmt.setInt(1, Integer.parseInt(cabinId));

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                averageRating = rs.getDouble(1);
                if (rs.wasNull()) {
                     averageRating = -1;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return averageRating;
    }

}
