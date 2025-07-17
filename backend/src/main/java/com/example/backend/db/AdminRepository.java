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
                "SELECT * FROM admin WHERE username = ?")) {

            stmt.setString(1, username);

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

    @Override
    public int acceptRegistrationRequest(String username) {

        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "UPDATE users SET status = 1 WHERE username = ?")) {

            stmt.setString(1, username);
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }

        return 1;
    }

    @Override
    public int declineRegistrationRequest(String username) {
        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "DELETE FROM users WHERE username = ?")) {

            stmt.setString(1, username);
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }

        return 1;
    }
}
