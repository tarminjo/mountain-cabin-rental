import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.error = false;
    localStorage.removeItem('logged');
  }

  username: string = '';
  password: string = '';
  message: string = '';
  error: boolean = false;

  login() {
    if (this.username == '' || this.password == '') {
      this.message = "Enter all fields";
      this.error = true;
      return;
    }

    this.message = '';
    this.error = false;

    this.userService
      .login(this.username, this.password)
      .subscribe((user: any) => {
        if (user != null) {
          localStorage.setItem('logged', user.username);
          this.router.navigate([user.type])
        } else {
          this.message = 'Wrong username or password';
          this.error = true;
          return;
        }
      });
  }

  backToHomePage() {
    this.router.navigate(['']);
  }
}
