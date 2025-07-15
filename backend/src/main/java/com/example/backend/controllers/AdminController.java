package com.example.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.db.AdminRepository;
import com.example.backend.models.Admin;

@Controller
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:4200")
public class AdminController {
    
    @GetMapping("/login")
    public Admin login(@RequestBody Admin admin) {
        return new AdminRepository().login(admin.getUsername(), admin.getPassword());
    }

    @PostMapping("/register")
    public Admin register(@RequestBody Admin admin) {
        return new AdminRepository().register(admin);
    }
}
