package com.example.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
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

    @PostMapping(path = "/login")
    public User login(@RequestBody LoginDTO dto) {
        return new UserRepository().login(dto.getUsername(), dto.getPassword());
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return new UserRepository().register(user);
    }
    
}
