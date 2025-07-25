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
                 "INSERT INTO rentals (createdAt, cabinId, cabinName, cabinLocation, user, startDate, endDate, adults, children, description, price) " +
                 "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
            String formatted = now.format(formatter);

            stmt.setTimestamp(1, Timestamp.valueOf(parseDateToDatabase(formatted)));
            stmt.setInt(2, Integer.parseInt(payload.get("cabinId")));
            stmt.setString(2, payload.get("cabinName"));
            stmt.setString(3, payload.get("cabinLocation"));
            stmt.setString(3, payload.get("user"));
            stmt.setTimestamp(4, Timestamp.valueOf(parseDateToDatabase(payload.get("startDate"))));
            stmt.setTimestamp(5, Timestamp.valueOf(parseDateToDatabase(payload.get("endDate"))));
            stmt.setInt(6, Integer.parseInt(payload.get("adults")));
            stmt.setInt(7, Integer.parseInt(payload.get("children")));
            stmt.setString(8, payload.get("description"));
            stmt.setInt(9, Integer.parseInt(payload.get("price")));

            int rows = stmt.executeUpdate();
            if (rows > 0) {
                return 1;
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
                 "SELECT COUNT(*) FROM rentals WHERE createdAt >= NOW() - INTERVAL 1 DAY")) {

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
                 "SELECT COUNT(*) FROM rentals WHERE createdAt >= NOW() - INTERVAL 7 DAY")) {

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
                 "SELECT COUNT(*) FROM rentals WHERE createdAt >= NOW() - INTERVAL 30 DAY")) {

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
                 "SELECT * FROM rentals WHERE user = ? AND endDate >= NOW()")) {

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
                 "SELECT * FROM rentals WHERE user = ? AND endDate < NOW()")) {

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
                rental.setStatus(rs.getInt("status"));
                rental.setPrice(rs.getInt("price"));

                rentals.add(rental);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rentals;
    }
}
