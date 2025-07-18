import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-cabins-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin-cabins-dashboard.component.html',
  styleUrl: './admin-cabins-dashboard.component.css'
})
export class AdminCabinsDashboardComponent implements OnInit {

  ngOnInit() {
    
  }

  cabins: any[] = []

  cabin(username: string) {
    // Logic to handle cabin operations

  }
}
