package com.example.backend.models;

import java.util.Date;

public class Rental {
    private int id;
    private Date createdAt;
    private int cabinId;
    private String cabinName;
    private String cabinLocation;
    private String cabinOwner;
    private String user;
    private Date startDate;
    private Date endDate;
    private int adults;
    private int children;
    private String description;
    private String comment;
    private int rating;
    private int status;
    private double price;

    public Rental() {
    }

    public Rental(int id, Date createdAt, int cabinId, String cabinName, String cabinLocation, String cabinOwner, String user, Date startDate, Date endDate,
                  int adults, int children, String description, String comment, int rating, int status, double price) {
        
        this.id = id;
        this.createdAt = createdAt;
        this.cabinId = cabinId;
        this.cabinName = cabinName;
        this.cabinOwner = cabinOwner;
        this.cabinLocation = cabinLocation;
        this.user = user;
        this.startDate = startDate;
        this.endDate = endDate;
        this.adults = adults;
        this.children = children;
        this.description = description;
        this.comment = comment;
        this.rating = rating;
        this.status = status;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public int getCabinId() {
        return cabinId;
    }

    public void setCabinId(int cabinId) {
        this.cabinId = cabinId;
    }

    public String getCabinName() {
        return cabinName;
    }
    
    public void setCabinName(String cabinName) {
        this.cabinName = cabinName;
    }

    public String getCabinLocation() {
        return cabinLocation;
    }

    public void setCabinLocation(String cabinLocation) {
        this.cabinLocation = cabinLocation;
    }

    public String getCabinOwner() {
        return cabinOwner;
    }

    public void setCabinOwner(String cabinOwner) {
        this.cabinOwner = cabinOwner;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public java.util.Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getAdults() {
        return adults;
    }

    public void setAdults(int adults) {
        this.adults = adults;
    }

    public int getChildren() {
        return children;
    }

    public void setChildren(int children) {
        this.children = children;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
