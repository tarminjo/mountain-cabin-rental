package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Admin;
import com.example.backend.models.User;

public interface AdminRepositoryInterface {
    
    public Admin login(String username, String password);
    public int acceptRegistrationRequest(String username);
    public int declineRegistrationRequest(String username);
    public List<User> getActiveUsers();
    public int deactivateUser(String username);
}
