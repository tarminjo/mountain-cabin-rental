import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { RentalService } from '../services/rental.service';
import { CabinService } from '../services/cabin.service';
import { User } from '../models/user';
import { Rental } from '../models/rental';

@Component({
  selector: 'app-owner-rentals',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './owner-rentals.component.html',
  styleUrl: './owner-rentals.component.css'
})
export class OwnerRentalsComponent implements OnInit {
  
  constructor(private router: Router, private userService: UserService,
    private rentalService: RentalService, private cabinService: CabinService
  ) {}

  user: User = new User;
  username: string = localStorage.getItem("logged") || ""
  selectedTab: string = "cabins"

  activeUnconfirmedRentals: Rental[] = []

  ngOnInit(): void {
    this.username = localStorage.getItem('logged') || '';
    this.selectedTab = 'active';

    this.userService.getUser(this.username).subscribe((user: User) => {
      this.user = user;
    });

    this.rentalService.getActiveUnconfirmedRentalsForOwner(this.username).subscribe((activeUnconfirmedRentals: Rental[]) => {
      this.activeUnconfirmedRentals = activeUnconfirmedRentals;
      this.activeUnconfirmedRentals.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateA - dateB;
      });
    });
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/login']);
  }

  acceptReservation(rentalId: number){
    this.rentalService.acceptRental(rentalId).subscribe((resp: any) => {
      if(resp.message === 'ok') {
        alert('Reservation accepted successfully.');
        this.ngOnInit();
      } else {
        alert('Error occurred while accepting reservation.');
      }
    });
  }

  rejectReservation(rentalId: number){
    console.log('Submitting reject with comment:', this.rejectComment);
    this.rentalService.rejectRental(rentalId, this.rejectComment).subscribe((resp: any) => {
      console.log('Reject response:', resp);
      if(resp.message === 'ok') {
        alert('Reservation rejected successfully.');
        this.ngOnInit();
        this.closeRejectWindow()
      } else {
        alert('Error occurred while rejecting reservation.');
        this.closeRejectWindow()
      }
    });
  }

  showRejectModal: boolean = false;
  selectedRejectId: number | null = null;
  rejectComment: string = '';
  rejectError: boolean = false;

  openRejectWindow(rentalId: number) {
    this.selectedRejectId = rentalId;
    this.rejectComment = '';
    this.showRejectModal = true;
  }

  closeRejectWindow() {
    this.showRejectModal = false;
    this.selectedRejectId = null;
    this.rejectComment = '';
  }
}
