package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.backend.models.Admin;
import com.example.backend.models.User;

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

    @Override
    public List<User> getActiveUsers() {
        
        List<User> users = new ArrayList<>();

        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "SELECT * FROM users WHERE status = 1")) {

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                User user = new User();

                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                user.setType(rs.getString("type"));
                user.setFirstname(rs.getString("firstname"));
                user.setLastname(rs.getString("lastname"));
                user.setSex(rs.getString("sex"));
                user.setAddress(rs.getString("address"));
                user.setPhoneNumber(rs.getString("phoneNumber"));   
                user.setMail(rs.getString("mail"));
                user.setProfilePic(rs.getString("profilePic"));
                user.setCardNumber(rs.getString("cardNumber"));
                user.setStatus(rs.getInt("status"));

                users.add(user);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return users;
    }

    @Override
    public int deactivateUser(String username) {

        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "UPDATE users SET status = 2 WHERE username = ?")) {

            stmt.setString(1, username);
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }

        return 1;
    }

    @Override
    public int updateUserAccount(Map<String, String> payload) {
        
        String query = "";
        if(payload.get("profilePic").isEmpty()){
            query = "UPDATE users SET firstname = ?, lastname = ?, address = ?, phoneNumber = ?, " +
                "mail = ?, cardNumber = ? WHERE username = ?";
        }
        else{
            query = "UPDATE users SET firstname = ?, lastname = ?, address = ?, phoneNumber = ?, " +
                "mail = ?, cardNumber = ?, profilePic = ? WHERE username = ?";
        }
        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, payload.get("firstname"));
            stmt.setString(2, payload.get("lastname"));
            stmt.setString(3, payload.get("address"));
            stmt.setString(4, payload.get("phoneNumber"));
            stmt.setString(5, payload.get("mail"));
            stmt.setString(6, payload.get("cardNumber"));

            if(payload.get("profilePic").isEmpty()){
                stmt.setString(7, payload.get("username"));
            } else{
                stmt.setString(7, payload.get("profilePic"));
                stmt.setString(8, payload.get("username"));
            }

            int rows = stmt.executeUpdate();
            if (rows > 0) {
                return 1;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }

    

}
