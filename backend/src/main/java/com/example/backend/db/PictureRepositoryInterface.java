package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Picture;

public interface PictureRepositoryInterface {
    
    List<String> getCabinPictures(Integer cabinId);
    int addPicture(Picture picture);
    int deletePicture(int id);
}
