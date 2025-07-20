package com.example.backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.AdminRepository;
import com.example.backend.db.UserRepository;
import com.example.backend.models.Admin;
import com.example.backend.models.User;



@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:4200")
public class AdminController {
    
    @PostMapping("/login")
    public Admin login(@RequestBody Admin admin) {
        return new AdminRepository().login(admin.getUsername(), admin.getPassword());
    }

    @GetMapping("/requests")
    public List<User> getRegisterRequests() {
        return new UserRepository().getAllRequests();
    }

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
    
    @GetMapping("/active-users")
    public List<User> getMethodName() {
        return new AdminRepository().getActiveUsers();
    }
    
    @PostMapping("/deactivate-user")
    public Map<String, String> deactivateUser(@RequestBody Map<String, String> payload) {
        int result = new AdminRepository().deactivateUser(payload.get("username"));

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }

    @PostMapping("/update-account")
    public Map<String, String> updateUserAccount(@RequestBody Map<String, String> payload) {
        
        int result = new AdminRepository().updateUserAccount(payload);

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }
    
}
