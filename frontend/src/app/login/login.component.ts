import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    localStorage.removeItem("logged")
  }

  username: string = ""
  password: string = ""
  message: string = ""
  noDataError: boolean = false;

  login(){
    if(this.username=="" || this.password==""){
      this.message="Niste uneli sve podatke!"
      this.noDataError = true;
      return
    }

    this.message=""

    this.userService.login(this.username, this.password).subscribe((user: any)=>{
      if(user){
        localStorage.setItem("logged", user.username)
        this.router.navigate(["profile"])
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
