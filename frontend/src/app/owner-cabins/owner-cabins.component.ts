import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-owner-cabins',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './owner-cabins.component.html',
  styleUrl: './owner-cabins.component.css'
})
export class OwnerCabinsComponent {

}
