import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BarraDeNavegacionComponent } from './barra-de-navegacion/barra-de-navegacion.component';


import { AuthService } from './service/auth.service';
import { OnInit } from '@angular/core';
import { UserI } from './models/user';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, BarraDeNavegacionComponent],
    // template: `
    // <main>
    //   <app-home></app-home>
    // </main>`,
})
export class AppComponent implements OnInit{
  title = 'MotoWeb';
  loggedInUser: string ='';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedInUsers.subscribe((user) => {
      this.loggedInUser = user;
    });
  }
}
