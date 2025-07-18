import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-cabins-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin-cabins-dashboard.component.html',
  styleUrl: './admin-cabins-dashboard.component.css'
})
export class AdminCabinsDashboardComponent {

}
