package com.example.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.AdminRepository;
import com.example.backend.models.Admin;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:4200")
public class AdminController {
    
    @PostMapping("/login")
    public Admin login(@RequestBody Admin admin) {
        return new AdminRepository().login(admin.getUsername(), admin.getPassword());
    }

    @PostMapping("/accept-registration")
    public void acceptRegistration(@RequestAttribute String username) {
        new AdminRepository().acceptRegistrationRequest(username);
    }

    @PostMapping("/decline-registration")
    public void declineRegistration(@RequestAttribute String username) {
        new AdminRepository().declineRegistrationRequest(username);
    }
    
}
