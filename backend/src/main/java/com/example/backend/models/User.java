package com.example.backend.models;

public class User {
    private String username;
    private String password;
    private String type;
    private String firstname;
    private String lastname;
    private String sex;
    private String address;
    private String phoneNumber;
    private String mail;
    private String profilePic;
    private String cardNumber;
    private int status;
    //private String company;

    public User() {
    }

    public User(String username, String password, String type, String firstname, String lastname, String sex,
                String address, String phoneNumber, String mail, String profilePic, String cardNumber, int status/*, String company*/) {
        this.username = username;
        this.password = password;
        this.type = type;
        this.firstname = firstname;
        this.lastname = lastname;
        this.sex = sex;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.mail = mail;
        this.profilePic = profilePic;
        this.cardNumber = cardNumber;
        this.status = status;
        //this.company = company;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    // public String getCompany() {
    //     return company;
    // }

    // public void setCompany(String company) {
    //     this.company = company;
    // }
}
