import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tourist-rentals',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './tourist-rentals.component.html',
  styleUrl: './tourist-rentals.component.css'
})
export class TouristRentalsComponent {

}
