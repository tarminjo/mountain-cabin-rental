package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Cabin;

public interface CabinRepositoryInterface {
    
    public List<Cabin> getCabinsByOwnerUsername(String owner);
}
