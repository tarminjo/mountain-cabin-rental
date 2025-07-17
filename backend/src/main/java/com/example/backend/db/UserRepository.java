package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.backend.models.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UserRepository implements UserRepositoryInterface {

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User login(String username, String password) {
        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "SELECT * FROM users WHERE username = ?")) {

            stmt.setString(1, username);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                String storedPassword = rs.getString("password");
                int status = rs.getInt("status");

                if (passwordEncoder.matches(password, storedPassword) && status == 1) {
                    User user = new User();

                    user.setUsername(rs.getString("username"));
                    user.setPassword(storedPassword);
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

                    return user;
                    // return new User(
                    //     rs.getString("username"),
                    //     storedPassword,
                    //     rs.getString("type"),
                    //     rs.getString("firstname"),
                    //     rs.getString("lastname"),
                    //     rs.getString("sex"),
                    //     rs.getString("address"),
                    //     rs.getString("phoneNumber"),
                    //     rs.getString("mail"),
                    //     rs.getString("profilePic"),
                    //     rs.getString("cardNumber"),
                    //     rs.getInt("status")
                    // );
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public int register(User user) {

        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "INSERT INTO users (username, password, type, firstname, lastname," + 
                    " sex, address, phoneNumber, mail, profilePic, cardNumber, status) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

            stmt.setString(1, user.getUsername());

            String hashedPassword = passwordEncoder.encode(user.getPassword());
            stmt.setString(2, hashedPassword);
            stmt.setString(3, user.getType());
            stmt.setString(4, user.getFirstname());
            stmt.setString(5, user.getLastname());
            stmt.setString(6, user.getSex());
            stmt.setString(7, user.getAddress());
            stmt.setString(8, user.getPhoneNumber());
            stmt.setString(9, user.getMail());
            stmt.setString(10, user.getProfilePic());
            stmt.setString(11, user.getCardNumber());
            stmt.setInt(12, 0);

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
