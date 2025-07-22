package com.example.backend.models;

public class Picture {
    private int id;
    private String cabinId;
    private String url;

    public Picture() {
    }

    public Picture(int id, String cabinId, String url) {
        this.id = id;
        this.cabinId = cabinId;
        this.url = url;
    }

    public int getId() {
        return id;
    }

    public String getCabinId() {
        return cabinId;
    }

    public String getUrl() {
        return url;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setCabinId(String cabinId) {
        this.cabinId = cabinId;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    
}
