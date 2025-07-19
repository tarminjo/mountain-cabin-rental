import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-owner-rentals',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './owner-rentals.component.html',
  styleUrl: './owner-rentals.component.css'
})
export class OwnerRentalsComponent {

}
