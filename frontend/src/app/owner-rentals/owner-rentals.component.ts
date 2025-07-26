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

    this.error = false
    this.message = ""

    this.userService.getUser(this.username).subscribe((user: User) => {
      this.user = user;
    });

    this.rentalService.getActiveUnconfirmedRentalsForOwner(this.username).subscribe((activeUnconfirmedRentals: Rental[]) => {
      this.activeUnconfirmedRentals = activeUnconfirmedRentals;
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
}
