package com.example.backend.models;

public class Cabin {
    private int id;
    private String owner;
    private String name;
    private String location;
    private String phoneNumber;
    private String services;
    private int winterPrice;
    private int summerPrice;
    
    public Cabin() {
    }

    public Cabin(int id, String owner, String name, String location, 
        String phoneNumber, String Services, int winterPrice, int summerPrice) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.location = location;
        this.phoneNumber = phoneNumber;
        this.services = Services;
        this.winterPrice = winterPrice;
        this.summerPrice = summerPrice;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getServices() {
        return services;
    }

    public void setServices(String Services) {
        this.services = Services;
    }

    public int getWinterPrice() {
        return winterPrice;
    }

    public void setWinterPrice(int winterPrice) {
        this.winterPrice = winterPrice;
    }

    public int getSummerPrice() {
        return summerPrice;
    }

    public void setSummerPrice(int summerPrice) {
        this.summerPrice = summerPrice;
    }
}
