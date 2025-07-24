package com.example.backend.db;

import java.util.Map;

public interface RentalRepositoryInteraface {
    
    int createRental(Map<String, String> payload);
}
