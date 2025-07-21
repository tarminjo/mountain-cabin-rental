package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.Cabin;


@RestController
@RequestMapping("/api/cabins")
@CrossOrigin("http://localhost:4200")
public class CabinController {
    
    @GetMapping("/{username}")
    public List<Cabin> getMyCabins(@PathVariable String username) {
        return null;
    }
    
}
