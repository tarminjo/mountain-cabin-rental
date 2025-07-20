import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8081/api"

  updateAccountDetails(username: string, firstname: string, lastname: string, 
    address: string, phoneNumber: string, mail: string, cardNumber: string) {
    const data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      address: address,
      phoneNumber: phoneNumber,
      mail: mail,
      cardNumber: cardNumber
    }

      return this.http.post(`${this.url}/users/update-account-details`, data)
  }

  updateAccountDetailsAndPicture(username: string, firstname: string, lastname: string, 
    address: string, phoneNumber: string, mail: string, cardNumber: string, profilePic: string) {
    const data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      address: address,
      phoneNumber: phoneNumber,
      mail: mail,
      cardNumber: cardNumber,
      profilePic: profilePic
    }

      return this.http.post(`${this.url}/admin/update-account`, data)
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`${this.url}/users/` + username);
  }

  deactivateUser(username: string){
    const data = {
      username: username
    }

    return this.http.post(`${this.url}/admin/deactivate-user`, data);
  }

  getActiveUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/admin/active-users`);
  }

  getAllRequests():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/admin/requests`)
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

  updatePassword(username: any, oldPassword: any, newPassword: any){
    const data = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword
    }

    return this.http.post(`${this.url}/users/update-password`, data)
  }

  updateProfilePicture(username: any, profilePic: any){
    const data = {
      username: username,
      profilePic: profilePic
    }

    return this.http.post(`${this.url}/users/update-profile-picture`, data)
  }
}
