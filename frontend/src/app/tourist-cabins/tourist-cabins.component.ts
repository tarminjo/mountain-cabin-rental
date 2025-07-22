import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { CabinService } from '../services/cabin.service';
import { User } from '../models/user';
import { Cabin } from '../models/cabin';

@Component({
  selector: 'app-tourist-cabins',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './tourist-cabins.component.html',
  styleUrl: './tourist-cabins.component.css'
})
export class TouristCabinsComponent implements OnInit {

  constructor(private router: Router, private userService: UserService,
    private cabinService: CabinService
  ) {}

  user: User = new User;
  username: string = localStorage.getItem("logged") || ""
  cabins: Cabin[] = []
  originalCabins: Cabin[] = []

  ngOnInit(): void {
      
    this.username = localStorage.getItem('logged') || '';
    this.error = false
    this.message = ""
    this.nameParam = ""
    this.locationParam = ""

    this.userService.getUser(this.username).subscribe((user: User)=>{
          this.user = user
    })

    this.cabinService.getAllCabins().subscribe((myCabins: Cabin[])=>{
      this.cabins = myCabins
      this.originalCabins = [...myCabins];
    })
  }

  error: boolean = false
  message: string = ""

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/login']);
  }

  nameParam: string = ""
  locationParam: string = ""

  activeNameSort: 'asc' | 'desc' | null = null;
  activeLocationSort: 'asc' | 'desc' | null = null;

  applySorting() {
    this.cabins = [...this.originalCabins];

    if (this.activeNameSort) {
      this.cabins.sort((a, b) =>
        this.activeNameSort === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }

    if (this.activeLocationSort) {
      this.cabins.sort((a, b) =>
        this.activeLocationSort === 'asc'
          ? a.location.localeCompare(b.location)
          : b.location.localeCompare(a.location)
      );
    }
  }

  toggleNameSort(order: 'asc' | 'desc') {
    this.activeNameSort = this.activeNameSort === order ? null : order;
    this.applySorting();
  }

  toggleLocationSort(order: 'asc' | 'desc') {
    this.activeLocationSort = this.activeLocationSort === order ? null : order;
    this.applySorting();
  }

  resetSortAndFilters() {
    this.activeNameSort = null;
    this.activeLocationSort = null;
    this.locationParam = '';
    this.nameParam = '';
    this.cabins = [...this.originalCabins];
  }

  search(){
    this.cabinService.searchCabins(this.nameParam, this.locationParam).subscribe((cabins: Cabin[])=>{
      this.cabins = cabins
    })
  }
}

