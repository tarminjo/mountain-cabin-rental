package com.example.backend.db;

import com.example.backend.models.Admin;

public interface AdminRepositoryInterface {
    
    public Admin login(String username, String password);
    public void acceptRegistrationRequest(String username);
    public void declineRegistrationRequest(String username);

}
