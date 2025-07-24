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
    return this.http.get<Cabin[]>(`${this.url}/cabins/my/${username}`);
  }

  updateCabin(id: number, name: string, location: string, services: string,
    phoneNumber: string, winterPrice: number, summerPrice: number, latitude: number, longitude: number) {
    const data = {
      id: id,
      name: name,
      location: location,
      services: services,
      winterPrice: winterPrice,
      summerPrice: summerPrice,
      phoneNumber: phoneNumber,
      latitude: latitude,
      longitude: longitude
    }
    return this.http.post(`${this.url}/cabins/update`, data)
  }

  deleteCabin(id: number){
    return this.http.delete(`${this.url}/cabins/` + id)
  }

  createCabin(owner: string, name: string, location: string, services: string, phoneNumber: string, 
    winterPrice: number, summerPrice: number, latitude: number, longitude: number, images: string[]){

    const imageData: string = images.join(' ')
    const data = {
      owner: owner,
      name: name,
      location: location,
      services: services,
      winterPrice: winterPrice,
      summerPrice: summerPrice,
      phoneNumber: phoneNumber,
      latitude: latitude,
      longitude: longitude,
      imageData: imageData
    }
    return this.http.post(`${this.url}/cabins`, data)
  }

  getAllCabins(): Observable<Cabin[]> {
    return this.http.get<Cabin[]>(`${this.url}/cabins`);
  }

  searchCabins(nameParam: string, locationParam: string) {
    const data = {
      name: nameParam,
      location: locationParam
    }

    return this.http.get<Cabin[]>(`${this.url}/cabins/search`, { params: data });
  }

  getCabinById(id: number): Observable<Cabin> {
    return this.http.get<Cabin>(`${this.url}/cabins/${id}`);
  }

  getCabinPictures(cabinId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/cabins/pictures/${cabinId}`);
  }

}
