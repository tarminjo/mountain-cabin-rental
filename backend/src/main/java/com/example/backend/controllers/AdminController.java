package com.example.backend.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
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

    // TODO: Implement response messages for success or failure
    @PostMapping("/accept-registration")
    public Map<String, String> acceptRegistration(@RequestBody Map<String, String> payload) {
        int result = new AdminRepository().acceptRegistrationRequest(payload.get("username"));

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }

    // TODO: Implement response messages for success or failure
    @PostMapping("/decline-registration")
    public Map<String, String> declineRegistration(@RequestBody Map<String, String> payload) {
       int result = new AdminRepository().declineRegistrationRequest(payload.get("username"));

       Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }
    
}
