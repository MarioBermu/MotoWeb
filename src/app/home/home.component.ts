import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  loggedInUsers: string = '';

  constructor(public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.authService.loggedInUsers.subscribe(name => {
      this.loggedInUsers = name;
    });
  }

  onLogout(): void {
    this.authService.logout();
    // this.router.navigateByUrl('/home');
    this.router.navigateByUrl('/admin');
  }
  get userName(): string | null {
    return this.authService.getUserName();
  }

  get userEmail(): string | null {
    return this.authService.getUserEmail();
  }
}
