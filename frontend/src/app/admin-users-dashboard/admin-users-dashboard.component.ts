import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-users-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin-users-dashboard.component.html',
  styleUrl: './admin-users-dashboard.component.css'
})
export class AdminUsersDashboardComponent {
  constructor(private router: Router, private userService: UserService) { }
  
    ngOnInit(): void {
      this.userService.getActiveUsers().subscribe((requests: User[])=>{
        this.activeUsers = requests
      })
    }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/admin-login']);
  }
  
    activeUsers: User[] = []
  
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

    deactivateUser(username: string) {
      this.userService.deactivateUser(username).subscribe((resp: any) => {
        if (resp.message == 'ok') {
          alert("User deactivated!")
        } else {
          alert("ERROR!")
        }
  
        this.ngOnInit()
      })
    }
}
