import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CabinService } from '../services/cabin.service';
import { Cabin } from '../models/cabin';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router, private userService: UserService,
    private cabinService: CabinService
  ) {}

  username: string = localStorage.getItem("logged") || ""
  cabins: Cabin[] = []
  originalCabins: Cabin[] = []

  ngOnInit(): void {
      
    this.nameParam = ""
    this.locationParam = ""

    this.cabinService.getAllCabins().subscribe((myCabins: Cabin[])=>{
      this.cabins = myCabins
      this.originalCabins = myCabins
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

    if (!this.nameParam && !this.locationParam) {
      this.cabins = this.originalCabins
      return;
    }

    this.cabinService.searchCabins(this.nameParam, this.locationParam).subscribe((cabins: Cabin[])=>{
      this.cabins = cabins
    })
  }

  totalCabins: number = 0
  totalOwners: number = 0
  totalTourists: number = 0
  reservedLast24h: number = 0
  reservedLast7d: number = 0
  reservedLast30d: number = 0

  // Method to fetch statistics
}
