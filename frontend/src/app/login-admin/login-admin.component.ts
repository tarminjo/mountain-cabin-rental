import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) { }
  
  ngOnInit(): void {
    localStorage.removeItem("logged")
  }

  username: string = ""
  password: string = ""
  message: string = ""

  loginAdmin(){
    if(this.username=="" || this.password==""){
      this.message="Niste uneli sve podatke!"
      return
    }
    
    this.message=""

    this.userService.loginAdmin(this.username, this.password).subscribe((user: any)=>{
      if(user){
        localStorage.setItem("logged", user.username)
        this.router.navigate(['admin'])
      }
      else{
        this.message="Losi podaci!"
        return
      }

    })
  }

  backToHomePage(){
    this.router.navigate([''])
  }
}
