package com.example.backend.db;

import java.util.List;
import java.util.Map;

import com.example.backend.models.Cabin;

public interface CabinRepositoryInterface {
    
    public List<Cabin> getCabinsByOwnerUsername(String owner);
    public int updateCabin(Map<String, String> payload);
    public int deleteCabin(int id);
    public int createCabin(Cabin cabin);
}
