package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.example.backend.models.Cabin;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CabinRepository implements CabinRepositoryInterface{

    @Override
    public List<Cabin> getCabinsByOwnerUsername(String owner) {
        
        List<Cabin> response = new ArrayList<>(); 

        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "SELECT * FROM cabins WHERE owner = ?")) {

            stmt.setString(1, owner);

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                
                Cabin cabin = new Cabin();

                cabin.setId(rs.getInt("id"));
                cabin.setOwner(owner);
                cabin.setName(rs.getString("name"));
                cabin.setLocation(rs.getString("location"));
                cabin.setPhoneNumber(rs.getString("phoneNumber"));
                cabin.setServices(rs.getString("services"));
                cabin.setWinterPrice(rs.getInt("winterPrice"));
                cabin.setSummerPrice(rs.getInt("summerPrice"));
                cabin.setCoordinates(rs.getString("coordinates"));

                response.add(cabin);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return response;
    }

    @Override
    public int updateCabin(Map<String, String> payload) {
        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "UPDATE cabins SET name = ?, location = ?, services = ?, phoneNumber = ?, " +
                    "winterPrice = ?, summerPrice = ?, coordinates = ? WHERE id = ?")) {

            stmt.setString(1, payload.get("name"));
            stmt.setString(2, payload.get("location"));
            stmt.setString(3, payload.get("services"));
            stmt.setString(4, payload.get("phoneNumber"));
            stmt.setInt(5, Integer.parseInt(payload.get("winterPrice")));
            stmt.setInt(6, Integer.parseInt(payload.get("summerPrice")));
            stmt.setString(7, payload.get("coordinates"));
            stmt.setInt(8, Integer.parseInt(payload.get("id")));

            int rows = stmt.executeUpdate();
            if (rows > 0) {
                return 1;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }

    public int deleteCabin(int id){
        
        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "DELETE FROM cabins WHERE id = ?")) {

            stmt.setInt(1, id);
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }

        return 1;
    }

    public int createCabin(Map<String, String> payload) {

        int cabinId = -1;

        try (Connection conn = DB.source().getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                 "INSERT INTO cabins (owner, name, location, services, phoneNumber, winterPrice, summerPrice, coordinates) " +
                 "VALUES (?, ?, ?, ?, ?, ?, ?, ?)", PreparedStatement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, payload.get("owner"));
            stmt.setString(2, payload.get("name"));
            stmt.setString(3, payload.get("location"));
            stmt.setString(4, payload.get("services"));
            stmt.setString(5, payload.get("phoneNumber"));
            stmt.setInt(6, Integer.parseInt(payload.get("winterPrice")));
            stmt.setInt(7, Integer.parseInt(payload.get("summerPrice")));
            stmt.setString(8, payload.get("coordinates"));

            int rows = stmt.executeUpdate();
            if (rows > 0) {
                ResultSet generatedKeys = stmt.getGeneratedKeys();
                if (generatedKeys.next()) {
                    cabinId = generatedKeys.getInt(1);
                }
            } else {
                return 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }

        if (payload.containsKey("imageData")) {
            String imageDataStr = payload.get("imageData");
            List<String> picturesList = Arrays.stream(imageDataStr.split(" "))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());

            if (!picturesList.isEmpty() && cabinId != -1) {
                try (Connection conn = DB.source().getConnection();
                    PreparedStatement picStmt = conn.prepareStatement(
                        "INSERT INTO pictures (cabinId, src) VALUES (?, ?)")) {

                    for (String pic : picturesList) {
                        picStmt.setInt(1, cabinId);
                        picStmt.setString(2, pic);
                        picStmt.addBatch();
                    }

                    picStmt.executeBatch();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }

        return 1;
    }

    @Override
    public List<Cabin> getAllCabins() {
        List<Cabin> response = new ArrayList<>();

        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM cabins")) {

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                
                Cabin cabin = new Cabin();

                cabin.setId(rs.getInt("id"));
                cabin.setOwner(rs.getString("owner"));
                cabin.setName(rs.getString("name"));
                cabin.setLocation(rs.getString("location"));
                cabin.setPhoneNumber(rs.getString("phoneNumber"));
                cabin.setServices(rs.getString("services"));
                cabin.setWinterPrice(rs.getInt("winterPrice"));
                cabin.setSummerPrice(rs.getInt("summerPrice"));
                cabin.setCoordinates(rs.getString("coordinates"));

                response.add(cabin);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return response;
    }

    public List<Cabin> searchCabins(String location, String name) {

        List<Cabin> response = new ArrayList<>();

        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "SELECT * FROM cabins WHERE name LIKE ? AND location LIKE ?")) {

            stmt.setString(1, "%" + name + "%");
            stmt.setString(2, "%" + location + "%");

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                
                Cabin cabin = new Cabin();

                cabin.setId(rs.getInt("id"));
                cabin.setOwner(rs.getString("owner"));
                cabin.setName(rs.getString("name"));
                cabin.setLocation(rs.getString("location"));
                cabin.setPhoneNumber(rs.getString("phoneNumber"));
                cabin.setServices(rs.getString("services"));
                cabin.setWinterPrice(rs.getInt("winterPrice"));
                cabin.setSummerPrice(rs.getInt("summerPrice"));
                cabin.setCoordinates(rs.getString("coordinates"));

                response.add(cabin);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return response;
    }

    public Cabin getCabinById(Integer id) {
        
        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM cabins WHERE id = ?")) {

            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                Cabin cabin = new Cabin();
                cabin.setId(rs.getInt("id"));
                cabin.setOwner(rs.getString("owner"));
                cabin.setName(rs.getString("name"));
                cabin.setLocation(rs.getString("location"));
                cabin.setPhoneNumber(rs.getString("phoneNumber"));
                cabin.setServices(rs.getString("services"));
                cabin.setWinterPrice(rs.getInt("winterPrice"));
                cabin.setSummerPrice(rs.getInt("summerPrice"));
                cabin.setCoordinates(rs.getString("coordinates"));

                return cabin;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }
    
}
