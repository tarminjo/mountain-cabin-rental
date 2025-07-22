package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Picture;

public class PictureRepository implements PictureRepositoryInterface {

    // Implement methods from PictureRepositoryInterface here
    @Override
    public List<Picture> getPicturesByCabinId(String cabinId) {
        // Implementation logic to retrieve pictures by cabin ID
        return null; // Placeholder return
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
