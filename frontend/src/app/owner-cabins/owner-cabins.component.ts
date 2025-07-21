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
  username: string = ""
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

  name: string = ""
  location: string = ""
  services: string = ""
  phoneNumber: string = ""
  winterPrice: number = 0
  summerPrice: number = 0
  coordinates: string = ""

  editCabin(id: number){
    this.cabinService.updateCabin(id, this.name, this.location, this.services,
      this.phoneNumber, this.winterPrice, this.summerPrice).subscribe((resp: any) => {
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

  createCabin(owner: string){
    this.cabinService.createCabin(owner, this.name, this.location, this.services,
      this.phoneNumber, this.winterPrice, this.summerPrice).subscribe((resp: any) => {
      if (resp.message == 'ok') {
        alert("Cabin updated!")
      } else {
        alert("ERROR!")
      }
      this.ngOnInit()
    })
  }
}
