package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.backend.models.Admin;

public class AdminRepository implements AdminRepositoryInterface {

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public Admin login(String username, String password) {
        
        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "SELECT * FROM users WHERE username = ? AND type = ?")) {

            stmt.setString(1, username);
            stmt.setString(2, "admin");

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                String storedPassword = rs.getString("password");

                if (passwordEncoder.matches(password, storedPassword)) {
                    return new Admin(
                        rs.getString("username"),
                        storedPassword
                    );
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    // temporary method for admin registration
    // TODO: Delete this method when admin registration is implemented
    @Override
    public Admin register(Admin admin) {

        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "INSERT INTO users (username, password) VALUES (?, ?)")) {

            stmt.setString(1, admin.getUsername());

            String hashedPassword = passwordEncoder.encode(admin.getPassword());
            stmt.setString(2, hashedPassword);

            int rows = stmt.executeUpdate();
            if (rows > 0) {
                admin.setPassword(hashedPassword);
                return admin;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }
    
}
