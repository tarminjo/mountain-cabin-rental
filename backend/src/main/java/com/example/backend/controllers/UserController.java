package com.example.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.db.UserRepository;
import com.example.backend.models.User;


@Controller
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:4200")
public class UserController {

    @GetMapping("/login")
    public User login(@RequestBody User user) {
        return new UserRepository().login(user.getUsername(), user.getPassword(), user.getType());
    }

    @GetMapping("/register")
    public User register(@RequestBody User user) {
        return new UserRepository().register(user);
    }
    
}
