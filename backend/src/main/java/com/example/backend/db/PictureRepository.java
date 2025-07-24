package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.models.Picture;

public class PictureRepository implements PictureRepositoryInterface {

    @Override
    public List<String> getCabinPictures(Integer cabinId) {

        List<String> pictures = new ArrayList<>();

        try (Connection conn = DB.source().getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT src FROM pictures WHERE cabinId = ?")) {

            stmt.setInt(1, cabinId);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                pictures.add(rs.getString("src"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return pictures;
    }

    @Override
    public int addPicture(Picture picture) {
        // Implementation logic to add a picture
        return 0; // Placeholder return
    }

    @Override
    public int deletePicture(int id) {
        // Implementation logic to delete a picture by ID
        return 0; // Placeholder return
    }
    
}
