import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';

import { PageNosotrosComponent } from '../page-nosotros/page-nosotros.component';
import { HomeComponent } from '../home/home.component';

import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { UserI } from '../models/user';




@Component({
  selector: 'app-barra-de-navegacion',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './barra-de-navegacion.component.html',
  styleUrl: './barra-de-navegacion.component.css'
})
export class BarraDeNavegacionComponent implements OnInit {
  loggedInUsers: string = '';

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loggedInUsers.subscribe(name => {
      this.loggedInUsers = name;
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/home');
    //this.router.navigateByUrl('/admin');
  }

  get userName(): string | null {
    return this.authService.getUserName();
  }

  get userEmail(): string | null {
    return this.authService.getUserEmail();
  }
}

