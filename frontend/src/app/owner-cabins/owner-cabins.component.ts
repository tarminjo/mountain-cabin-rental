import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-owner-cabins',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './owner-cabins.component.html',
  styleUrl: './owner-cabins.component.css'
})
export class OwnerCabinsComponent implements OnInit {
    
  constructor(private router: Router, private userService: UserService) {}
    
  ngOnInit(): void {
          
  }
    
  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/login']);
  }
}
