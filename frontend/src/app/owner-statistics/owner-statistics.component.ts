import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-owner-statistics',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './owner-statistics.component.html',
  styleUrl: './owner-statistics.component.css'
})
export class OwnerStatisticsComponent {

}
