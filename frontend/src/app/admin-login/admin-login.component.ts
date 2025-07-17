import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class LoginAdminComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) { }
  
  ngOnInit(): void {
    this.error = false
    localStorage.removeItem("logged")
  }

  username: string = ""
  password: string = ""

  message: string = ""
  error: boolean = false

  loginAdmin(){
    if(this.username=="" || this.password==""){
      this.message = "Enter all fields";
      this.error = true;
      return
    }
    
    this.message=""
    this.error = false

    this.userService.loginAdmin(this.username, this.password).subscribe((user: any)=>{
      if(user){
        localStorage.setItem("logged", user.username)
        this.router.navigate(['admin'])
      }
      else{
        this.message = 'Wrong username or password';
        this.error = true;
        return
      }
    })
  }

  backToHomePage(){
    this.router.navigate([''])
  }
}
