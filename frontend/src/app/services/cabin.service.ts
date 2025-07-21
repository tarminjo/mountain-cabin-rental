import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cabin } from '../models/cabin';

@Injectable({
  providedIn: 'root'
})
export class CabinService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8081/api"

  getMyCabins(username: string): Observable<Cabin[]> {
    const data = {
      username: username
    }
    return this.http.get<Cabin[]>(`${this.url}/cabins/` + username);
  }

  updateCabin(id: number, name: string, location: string, services: string,
    phoneNumber: string, winterPrice: number, summerPrice: number) {
    const data = {
      id: id,
      name: name,
      location: location,
      services: services,
      winterPrice: winterPrice,
      summerPrice: summerPrice,
      phoneNumber: phoneNumber
    }
    return this.http.post(`${this.url}/cabins/update`, data)
  }

  deleteCabin(id: number){
    return this.http.delete(`${this.url}/cabins?id=${id}`)
  }

  createCabin(owner: string, name: string, location: string, services: string,
    phoneNumber: string, winterPrice: number, summerPrice: number){
    const data = {
      name: name,
      location: location,
      services: services,
      winterPrice: winterPrice,
      summerPrice: summerPrice,
      phoneNumber: phoneNumber
    }
    return this.http.post(`${this.url}/cabins`, data)
  }
}
