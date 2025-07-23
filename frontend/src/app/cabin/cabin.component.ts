import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CabinService } from '../services/cabin.service';
import { UserService } from '../services/user.service';
import { Cabin } from '../models/cabin';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-cabin',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MapComponent],
  templateUrl: './cabin.component.html',
  styleUrl: './cabin.component.css'
})
export class CabinComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserService, private cabinService: CabinService) {}


  ngOnInit(): void {

    this.cabinId = Number(this.route.snapshot.paramMap.get('id'))
    console.log('Cabin ID:', this.cabinId)
    
    this.selectedTab = 'details';
    this.selectedStep = 'first';
    this.error = false
    this.message = ''

    this.cabinService.getCabinById(this.cabinId).subscribe(cabin => {
      this.cabin = cabin
    })

    this.username = localStorage.getItem('logged') || '';
    this.userService.getUser(this.username).subscribe((user) => {
      this.user = user;
    });
  }

  cabin: Cabin = new Cabin()
  cabinId: number | null = null;

  user: User = new User()
  username: string = ''

  logout() {
    localStorage.removeItem('logged')
    this.router.navigate(['/login'])
  }

  isCabinsRouteActive(): boolean {
    return this.router.url.startsWith('/tourist-cabins') || this.router.url.startsWith('/cabin')
  }

  error: boolean = false
  message: string = ''
  selectedTab: string = 'details'

  selectTab(tab: string): void {
    this.error = false
    this.message = ''
    this.selectedTab = tab
  }

  selectedStep: string = 'first'

  // First step variables
  startDate: Date | null = null
  endDate: Date | null = null
  adults: number = 0
  children: number = 0

  // Second step variables
  description: string = ''
  cardNumber: string = ''
  calculatedPrice: number = 0

  goToSecondStep(): void {

    this.error = false;
    this.message = '';

    if (!this.startDate || !this.endDate) {
      this.error = true;
      this.message = 'Please select both start and end dates.';
      return;
    }

    if (new Date(this.startDate) >= new Date(this.endDate)) {
      this.error = true;
      this.message = 'End date must be after start date.';
      return;
    }

    this.selectedStep = 'second';
  }

  submitReservation(): void {
    this.error = false;
    this.message = '';

    if (this.adults <= 0) {
      this.error = true;
      this.message = 'Number of adults must be greater than 0.';
      return;
    }

    if (this.children < 0) {
      this.error = true;
      this.message = 'Number of children cannot be negative.';
      return;
    }

    const reservationData = {
      cabinId: this.cabin.id,
      startDate: this.startDate,
      endDate: this.endDate,
      adults: this.adults,
      children: this.children
    };

    // Call the service to submit the reservation
    // Assuming a method exists in cabinService to handle reservations
    // this.cabinService.reserveCabin(reservationData).subscribe({
    //   next: (response) => {
    //     this.message = 'Reservation successful!';
    //     console.log(response);
    //     // Optionally, navigate to a confirmation page or reset the form
    //   },
    //   error: (err) => {
    //     this.error = true;
    //     this.message = 'Reservation failed. Please try again later.';
    //     console.error(err);
    //   }
    // });
  }

}
