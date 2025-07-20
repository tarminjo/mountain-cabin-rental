import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-cabins-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin-cabins-dashboard.component.html',
  styleUrl: './admin-cabins-dashboard.component.css'
})
export class AdminCabinsDashboardComponent implements OnInit {
  
  constructor(private router: Router, private userService: UserService) {}
  
  ngOnInit() {
    
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/admin-login']);
  }

  cabins: any[] = []

  cabin(username: string) {
    // Logic to handle cabin operations

  }
}
