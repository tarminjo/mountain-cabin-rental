package com.example.backend.db;

import com.example.backend.models.User;

public interface UserRepositoryInterface {
    
    public User login(String username, String password);
    public User register(User user);
}
