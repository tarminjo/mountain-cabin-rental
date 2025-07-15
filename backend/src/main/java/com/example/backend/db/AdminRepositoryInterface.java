package com.example.backend.db;

import com.example.backend.models.Admin;

public interface AdminRepositoryInterface {
    
    public Admin login(String username, String password);
}
