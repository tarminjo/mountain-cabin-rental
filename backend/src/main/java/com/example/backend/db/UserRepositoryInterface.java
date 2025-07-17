package com.example.backend.db;

import java.util.List;

import com.example.backend.models.User;

public interface UserRepositoryInterface {
    
    public User login(String username, String password);
    public int register(User user);
    public List<User> getAllRequests();
}
