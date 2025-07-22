package com.example.backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.CabinRepository;
import com.example.backend.models.Cabin;


@RestController
@RequestMapping("/api/cabins")
@CrossOrigin("http://localhost:4200")
public class CabinController {
    
    @GetMapping("/{username}")
    public List<Cabin> getMyCabins(@PathVariable String username) {
        return new CabinRepository().getCabinsByOwnerUsername(username);
    }

    @PostMapping("/update")
    public Map<String, String> updateCabin(@RequestBody Map<String, String> payload) {
        
        int result = new CabinRepository().updateCabin(payload);

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }

    @DeleteMapping("/{id}")
    public Map<String, String> deleteCabin(@PathVariable Integer id) {
        
        int result = new CabinRepository().deleteCabin(id);

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }

    @PostMapping
    public Map<String, String> createCabin(@RequestBody Cabin cabin) {
        
        int result = new CabinRepository().createCabin(cabin);

        Map<String, String> response = new HashMap<>();
        if (result == 1) {
            response.put("message", "ok");
        } else {
            response.put("message", "error");
        }
        return response;
    }
    
    @GetMapping
    public List<Cabin> getAllCabins() {
        return new CabinRepository().getAllCabins();
    }
    
    @GetMapping("/search")
    public List<Cabin> searchCabins(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String location) {

        return new CabinRepository().searchCabins(location, name);
    }

}
