import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CabinService } from '../services/cabin.service';
import { UserService } from '../services/user.service';
import { Cabin } from '../models/cabin';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';
import { MapComponent } from '../map/map.component';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-cabin',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MapComponent],
  templateUrl: './cabin.component.html',
  styleUrl: './cabin.component.css'
})
export class CabinComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserService, private cabinService: CabinService,
    private rentalService: RentalService) {}


  ngOnInit(): void {

    this.cabinId = Number(this.route.snapshot.paramMap.get('id'))
    
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

    if (this.startDate && this.endDate) {
      const startHour = new Date(this.startDate).getHours();
      const startMinutes = new Date(this.startDate).getMinutes();
      const endHour = new Date(this.endDate).getHours();

      if (startHour < 14 || (startHour === 14 && startMinutes === 0)) {
        this.error = true;
        this.message = 'Check-in is allowed only after 14:00.';
        return;
      }

      if (endHour >= 10) {
        this.error = true;
        this.message = 'Check-out must be before 10:00.';
        return;
      }
    }
    
    // TODO: WILL BE TURNED ONCE DATA POPULATING IS READY
    // if (new Date(this.startDate) < new Date() || new Date(this.endDate) < new Date()) {
    //   this.error = true;
    //   this.message = 'Start and end dates must be in the future.';
    //   return;
    // }
    
    const summerMonths = [4, 5, 6, 7]; // May (4), June (5), July (6), August (7)

    let summerNights = 0;
    let nonSummerNights = 0;
    
    if (this.startDate && this.endDate) {

      let start = new Date(this.startDate);
      let end = new Date(this.endDate);

      while (start.getDay() < end.getDay()) {
        if (summerMonths.includes(start.getMonth())) {
          summerNights++
        } else {
          nonSummerNights++
        }

        start.setDate(start.getDate() + 1)
      }
    }

    this.calculatedPrice = 
      (summerNights * (this.adults + this.children) * this.cabin.summerPrice) +
      (nonSummerNights * (this.adults + this.children) * this.cabin.winterPrice);

    this.cardNumber = this.user.cardNumber || '';
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

    let dinersRegex = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
    let masterCardRegex = /^(51|52|53|54|55)\d{14}$/
    let visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/

    if(!dinersRegex.test(this.cardNumber) && 
      !masterCardRegex.test(this.cardNumber) && 
      !visaRegex.test(this.cardNumber)) {
        
      this.error = true;
      this.message = 'Invalid card number format.';
      return;
    }

    // TODO: ADD RESERVATION SUBMISSION LOGIC
    this.rentalService.createRental(this.cabinId!, this.user.username, this.startDate!,
      this.endDate!, this.adults, this.children, this.description, this.calculatedPrice)
      .subscribe((resp: any) => {

        if(resp.message === 'ok') {
          this.error = false;
          this.selectedStep = 'finished';
        } else {
          this.error = true;
          this.message = 'Error while creating rental.';
        }
      })
  }

}
