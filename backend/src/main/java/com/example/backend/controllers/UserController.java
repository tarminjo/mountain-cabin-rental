package com.example.backend.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.UserRepository;
import com.example.backend.models.LoginDTO;
import com.example.backend.models.User;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:4200")
public class UserController {

    @GetMapping("/{username}")
    public User getUser(@PathVariable String username) {
        return new UserRepository().getUserByUsername(username);
    }
    
    @PostMapping(path = "/login")
    public User login(@RequestBody LoginDTO dto) {
        return new UserRepository().login(dto.getUsername(), dto.getPassword());
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {

        int result = new UserRepository().register(user);

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }

    @PostMapping("/update-account-details")
    public Map<String, String> updateUserAccountDetails(@RequestBody Map<String, String> payload) {
        
        int result = new UserRepository().updateUserAccountDetails(payload);

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }

    @PostMapping("/update-password")
    public Map<String, String> updateUserPassword(@RequestBody Map<String, String> payload) {
        
        int result = new UserRepository().updateUserPassword(payload);

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else if(result == 2) {
            response.put("message", "exact");
        } else {
            response.put("message", "error");
        }
        return response;
    }

    @PostMapping("/update-profile-picture")
    public Map<String, String> updateProfilePicture(@RequestBody Map<String, String> payload) {
        
        int result = new UserRepository().updateProfilePicture(payload);

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }

    
}
