import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Rental } from '../models/rental';
import { RentalService } from '../services/rental.service';
import { CabinService } from '../services/cabin.service';

@Component({
  selector: 'app-tourist-rentals',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './tourist-rentals.component.html',
  styleUrl: './tourist-rentals.component.css'
})
export class TouristRentalsComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, 
    private rentalService: RentalService, private cabinService: CabinService
  ) {}

  user: User = new User;
  username: string = localStorage.getItem("logged") || ""
  selectedTab: string = "cabins"

  ngOnInit(): void {
    this.username = localStorage.getItem('logged') || '';
    this.selectedTab = 'active';

    this.error = false
    this.message = ""

    this.userService.getUser(this.username).subscribe((user: User) => {
      this.user = user;
    });

    this.rentalService.getActiveRentalsForTourist(this.username).subscribe((activeRentals: Rental[]) => {
      this.activeRentals = activeRentals;
    });

    this.rentalService.getArchiveRentalsForTourist(this.username).subscribe((archiveRentals: Rental[]) => {
      this.archiveRentals = archiveRentals;
      this.archiveRentals.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB - dateA;
      });
    });
  }

  error: boolean = false
  message: string = ""

  selectTab(tab: string): void {
    this.error = false;
    this.message = '';
    this.selectedTab = tab;
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/login']);
  }

  activeRentals: Rental [] = []
  archiveRentals: Rental [] = []

  cancelReservation(rentalId: number) {
    
  }

  selectedRental: Rental = new Rental();

  rateReservation(rental: Rental) {
    this.selectedTab = 'rate'
    this.selectedRental = rental
  }

  submitRating() {

    if (this.ratingForm === 0) {
      return;
    }

    this.rentalService.addCommentAndRating(this.selectedRental.id, this.ratingForm, this.commentForm)
      .subscribe((resp: any) => {
        if (resp.message === 'ok') {
          this.error = false;
          alert('Rating added successfully!');
          this.selectedTab = 'archive';

          this.ngOnInit();
        } else {
          this.error = true;
          this.message = 'Failed to add rating. Please try again.';
        }
    });
  }

  commentForm: string = ""
  ratingForm: number = 0
  stars: number[] = [1, 2, 3, 4, 5]

  setRating(star: number): void {
    this.ratingForm = star;
  }

}
