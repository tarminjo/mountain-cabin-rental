package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.models.Cabin;

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

                cabin.setOwner(owner);
                cabin.setName(rs.getString("name"));
                cabin.setLocation(rs.getString("location"));
                cabin.setPhoneNumber(rs.getString("phoneNumber"));
                cabin.setServices(rs.getString("services"));
                cabin.setWinterPrice(rs.getInt("winterPrice"));
                cabin.setSummerPrice(rs.getInt("summerPrice"));

                response.add(cabin);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return response;
    }
    
}
