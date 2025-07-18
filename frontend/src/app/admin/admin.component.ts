import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getAllRequests().subscribe((requests: User[])=>{
      this.allRequests = requests
    })
  }

  allRequests: User[] = []

  acceptRequest(username: string){
    this.userService.acceptRequest(username).subscribe((resp: any)=>{
      if(resp.message == 'ok'){
        alert("Request accepted!")
      }
      else{
        alert("ERROR!")
      }

      this.ngOnInit()
    })
  }

  declineRequest(username: string){
    this.userService.declineRequest(username).subscribe((resp: any)=>{
      if(resp.message == 'ok'){
        alert("Request denied!")
      }
      else{
        alert("ERROR!")
      }

      this.ngOnInit()
    })
  }
}
