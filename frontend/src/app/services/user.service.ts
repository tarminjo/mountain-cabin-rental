import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/api";

  getAllRequests():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/users/requests`)
  }

  acceptRequest(username: any){
    const data = {
      username: username
    }

    return this.http.post(`${this.url}/admin/accept-registration`, data)
  }

  declineRequest(username: any){
    const data = {
      username: username
    }
    
    return this.http.post(`${this.url}/admin/decline-registration`, data)
  }

  login(username: any, password: any){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.url}/users/login`, data)
  }

  loginAdmin(username: any, password: any){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.url}/admin/login`, data)
  }

  register(username: any, password: any, type: any, firstname: any, lastname: any, sex: any, 
    address: any, phoneNumber: any, mail: any, profilePic: any, cardNumber: any, status: any){
    
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      type: type,
      sex: sex,
      address: address,
      phoneNumber: phoneNumber,
      mail: mail,
      profilePic: profilePic,
      cardNumber: cardNumber,
      status: status
    }

    return this.http.post(`${this.url}/users/register`, data)
  }

  checkPassword(username: any, password: any){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.url}/users/check-password`, data)
  }

  changePassword(username: any, password: any){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.url}/users/change-password`, data)
  }

  getUser(username: any){
    const data = {
      username: username
    }

    return this.http.post(`${this.url}/users/get-user`, data)
  }

  updatePicture(username: any, profilePic: any){
    const data = {
      username: username,
      profilePic: profilePic
    }

    return this.http.post(`${this.url}/users/update-picture`, data)
  }

  updateFirstname(username: any, firstname: any){
    const data = {
      username: username,
      firstname: firstname
    }

    return this.http.post(`${this.url}/users/update-firstname`, data)
  }

  updateLastname(username: any, lastname: any){
    const data = {
      username: username,
      lastname: lastname
    }

    return this.http.post(`${this.url}/users/update-lastname`, data)
  }

  updateAddress(username: any, address: any){
    const data = {
      username: username,
      address: address
    }

    return this.http.post(`${this.url}/users/update-address`, data)
  }

  updateMail(username: any, mail: any){
    const data = {
      username: username,
      mail: mail
    }

    return this.http.post(`${this.url}/users/update-mail`, data)
  }

  updatePhoneNumber(username: any, phoneNumber: any){
    const data = {
      username: username,
      phoneNumber: phoneNumber
    }

    return this.http.post(`${this.url}/users/update-phone-number`, data)
  }

  updateCardNumber(username: any, cardNumber: any){
    const data = {
      username: username,
      cardNumber: cardNumber
    }

    return this.http.post(`${this.url}/users/update-card-number`, data)
  }

}
