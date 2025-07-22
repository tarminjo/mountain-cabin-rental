import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { CabinService } from '../services/cabin.service';
import { User } from '../models/user';
import { Cabin } from '../models/cabin';

@Component({
  selector: 'app-owner-cabins',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './owner-cabins.component.html',
  styleUrl: './owner-cabins.component.css'
})
export class OwnerCabinsComponent implements OnInit {
    
  constructor(private router: Router, private userService: UserService,
    private cabinService: CabinService
  ) {}
    
  user: User = new User;
  username: string = localStorage.getItem("logged") || ""
  selectedTab: string = "cabins"

  ngOnInit(): void {

    this.username = localStorage.getItem('logged') || '';
    this.selectedTab = 'cabins';

    this.error = false
    this.message = ""

    this.userService.getUser(this.username).subscribe((user: User)=>{
          this.user = user
    })

    this.cabinService.getMyCabins(this.username).subscribe((myCabins: Cabin[])=>{
      this.cabins = myCabins
    })
  }

  error: boolean = false
  message: string = ""

  cabins: Cabin [] = []

  selectTab(tab: string): void {
    this.error = false;
    this.message = '';
    this.selectedTab = tab;
  }
    
  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/login']);
  }

  // variables for creating cabin
  name: string = ""
  location: string = ""
  services: string = ""
  phoneNumber: string = ""
  winterPrice: number = 0
  summerPrice: number = 0
  coordinates: string = ""

  // variabled for editing cabin
  editName: string = ""
  editLocation: string = ""
  editServices: string = ""
  editPhoneNumber: string = ""
  editWinterPrice: number = 0
  editSummerPrice: number = 0
  editCoordinates: string = ""

  selectedCabin: Cabin = new Cabin;

  enterEditCabin(cabin: Cabin) {
    this.selectedCabin = cabin
  
    this.editName = cabin.name;
    this.editLocation = cabin.location;
    this.editServices = cabin.services;
    this.editPhoneNumber = cabin.phoneNumber;
    this.editWinterPrice = cabin.winterPrice;
    this.editSummerPrice = cabin.summerPrice;
    this.editCoordinates = cabin.coordinates;

    this.selectedTab = 'edit'
  }

  updateCabin(id: number) {

    this.error = false
    this.message = ''

    if (this.editName === this.selectedCabin.name && this.editLocation === this.selectedCabin.location &&
      this.editServices === this.selectedCabin.services && this.editPhoneNumber === this.selectedCabin.phoneNumber &&
      this.editWinterPrice === this.selectedCabin.winterPrice && this.editSummerPrice === this.selectedCabin.summerPrice &&
      this.editCoordinates === this.selectedCabin.coordinates) {
      return
    }

    if (this.editName === "" || this.editLocation === "" || this.editServices === "" ||
      this.editPhoneNumber === "" || this.editWinterPrice <= 0 || this.editSummerPrice <= 0) {

      this.error = true
      this.message = "All fields must be filled!"
      return
    }

    let numberRegex = /^(06)\d{7,8}$|^0\d{8,9}$/
    if(!numberRegex.test(this.editPhoneNumber)){
      this.error = true
      this.message = "Wrong phone number format"
      return
    }

    this.cabinService.updateCabin(id, this.editName, this.editLocation, this.editServices,
      this.editPhoneNumber, this.editWinterPrice, this.editSummerPrice, this.editCoordinates).subscribe((resp: any) => {
      if (resp.message == 'ok') {
      alert("Cabin updated!")
      } else {
      alert("ERROR!")
      }
      this.ngOnInit()
    })
  }

  deleteCabin(id: number){
    this.cabinService.deleteCabin(id).subscribe((resp: any) => {
      if (resp.message == 'ok') {
        alert("Cabin deleted!")
      } else {
        alert("ERROR!")
      }
      this.ngOnInit()
    })
  }

  createCabin(){
    this.cabinService.createCabin(this.username, this.name, this.location, this.services,
      this.phoneNumber, this.winterPrice, this.summerPrice, this.coordinates).subscribe((resp: any) => {
      if (resp.message == 'ok') {
        alert("Cabin created!")
      } else {
        alert("ERROR!")
      }
      this.ngOnInit()
    })
  }
}
