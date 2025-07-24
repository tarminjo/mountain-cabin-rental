package com.example.backend.db;

import java.util.List;
import java.util.Map;

import com.example.backend.models.User;

public interface UserRepositoryInterface {
    
    public User login(String username, String password);
    public int register(User user);
    public List<User> getAllRequests();
    User getUserByUsername(String username);
    public int updateUserAccountDetails(Map<String, String> payload);
    public int updateUserPassword(Map<String, String> payload);
    public int updateProfilePicture(Map<String, String> payload);
    public List<User> getOwners();
    public List<User> getTourists();
}
