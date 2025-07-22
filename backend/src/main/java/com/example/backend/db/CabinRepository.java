package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
            stmt.setInt(7, Integer.parseInt(payload.get("id")));
            stmt.setString(8, payload.get("coordinates"));

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

    public int createCabin(Cabin cabin) {
        
        try(Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "INSERT INTO cabins (owner, name, location, services, phoneNumber, winterPrice, summerPrice, coordinates) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)")) {
            
            stmt.setString(1, cabin.getOwner());
            stmt.setString(2, cabin.getName());
            stmt.setString(3, cabin.getLocation());
            stmt.setString(4, cabin.getServices());
            stmt.setString(5, cabin.getPhoneNumber());
            stmt.setInt(6, cabin.getWinterPrice());
            stmt.setInt(7, cabin.getSummerPrice());
            stmt.setString(8, cabin.getCoordinates());

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
