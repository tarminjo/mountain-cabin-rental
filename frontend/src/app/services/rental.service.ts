import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  url = "http://localhost:8081/api"

  constructor(private http: HttpClient) { }

  createRental(cabinId: number, user: string, startDate: Date, endDate: Date, 
    adults: number, children: number, description: string, price: number,
    cabinName: string, cabinLocation: string, cabinOwner: string): Observable<Rental> {

      const data = {
        cabinId: cabinId,
        cabinName: cabinName,
        cabinLocation: cabinLocation,
        cabinOwner: cabinOwner,
        user: user,
        startDate: startDate,
        endDate: endDate,
        adults: adults,
        children: children,
        description: description,
        price: price
    };

    return this.http.post<Rental>(`${this.url}/rentals`, data);
  }

  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.url}/rentals`);
  }

  getRentalById(id: number): Observable<Rental> {
    return this.http.get<Rental>(`${this.url}/rentals/${id}`);
  }

  updateRental(id: number, rental: Rental): Observable<Rental> {
    return this.http.put<Rental>(`${this.url}/rentals/${id}`, rental);
  }

  deleteRental(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/rentals/${id}`);
  }

  reservationsLast24h(): Observable<number> {
    return this.http.get<number>(`${this.url}/rentals/reservations-last-24-hours`);
  }

  reservationsLast7d(): Observable<number> {
    return this.http.get<number>(`${this.url}/rentals/reservations-last-7-days`);
  }

  reservationsLast30d(): Observable<number> {
    return this.http.get<number>(`${this.url}/rentals/reservations-last-30-days`);
  }

  getActiveRentalsForTourist(username: string): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.url}/rentals/active/${username}`);
  }

  getArchiveRentalsForTourist(username: string): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.url}/rentals/archive/${username}`);
  }

  addCommentAndRating(id: number, ratingValue: number, ratingComment: string) {
    const data = {
      id: id,
      rating: ratingValue,
      comment: ratingComment
    };
    return this.http.post(`${this.url}/rentals/rating`, data);
  }

  getCabinRentalsWithRatings(cabinId: number) {
    return this.http.get<Rental[]>(`${this.url}/rentals/cabin/${cabinId}`);
  }

  getAverageRating(cabinId: number): Observable<number> {
    return this.http.get<number>(`${this.url}/rentals/average-rating/${cabinId}`);
  }

  cancelRental(id: number) {
    return this.http.get(`${this.url}/rentals/cancel/${id}`);
  }

  getActiveUnconfirmedRentalsForOwner(username: string) {
    return this.http.get<Rental[]>(`${this.url}/rentals/active-unconfirmed/${username}`);
  }

}
