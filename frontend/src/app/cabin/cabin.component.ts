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

}
