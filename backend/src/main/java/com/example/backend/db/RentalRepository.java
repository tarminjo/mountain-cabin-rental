package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class RentalRepository implements RentalRepositoryInteraface {

    @Override
    public int createRental(Map<String, String> payload) {
        
        try (Connection conn = DB.source().getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                 "INSERT INTO rentals (createdAt, cabinId, user, startDate, endDate, adults, children, description, price) " +
                 "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
            String formatted = now.format(formatter);

            stmt.setTimestamp(1, Timestamp.valueOf(parseDate(formatted)));
            stmt.setInt(2, Integer.parseInt(payload.get("cabinId")));
            stmt.setString(3, payload.get("user"));
            stmt.setTimestamp(4, Timestamp.valueOf(parseDate(payload.get("startDate"))));
            stmt.setTimestamp(5, Timestamp.valueOf(parseDate(payload.get("endDate"))));
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

    private LocalDateTime parseDate(String dateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        return LocalDateTime.parse(dateStr, formatter);
    }
    
}
