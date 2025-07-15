package com.example.backend.db;

import com.example.backend.models.User;

public interface UserRepositoryInterface {
    
    public User login(String username, String password, String type);
    public User register(User user);
}
