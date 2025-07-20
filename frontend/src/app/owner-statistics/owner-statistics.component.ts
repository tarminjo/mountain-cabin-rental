import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-owner-statistics',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './owner-statistics.component.html',
  styleUrl: './owner-statistics.component.css'
})
export class OwnerStatisticsComponent implements OnInit {
    
    constructor(private router: Router, private userService: UserService) {}
  
    ngOnInit(): void {
        
    }
  
    logout() {
      localStorage.removeItem('logged');
      this.router.navigate(['/login']);
    }
}
