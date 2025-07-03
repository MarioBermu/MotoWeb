
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNosotrosComponent } from '../page-nosotros/page-nosotros.component';
import { HomeComponent } from '../home/home.component';


import { UserI } from '../models/user';
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';



declare const bootstrap: any;
@Component({
  selector: 'app-barra-de-navegacion',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './barra-de-navegacion.component.html',
  styleUrl: './barra-de-navegacion.component.css'
})
export class BarraDeNavegacionComponent implements OnInit {
  private collapseInstance!: any;
  loggedInUsers: string = '';

  constructor(public authService: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object ) { }

  ngOnInit() {
    this.authService.loggedInUsers.subscribe(name => {
      this.loggedInUsers = name;
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/home');
    this.authService.logout();
    this.router.navigate(['/login']);
    this.onNavLinkClick();
  }

  ngAfterViewInit(): void {
    // si NO estamos en navegador, salimos
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    // aquí sí hay document
    const navEl = document.getElementById('MenuNavegacion');
    if (navEl) {
      this.collapseInstance = bootstrap.Collapse.getOrCreateInstance(navEl, {
        toggle: false
      });
    }
  }

  onNavLinkClick(): void {
    // tu lógica de ocultar menú; aquí sí que document existe
    const navEl = document.getElementById('MenuNavegacion');
    if (this.collapseInstance && navEl?.classList.contains('show')) {
      this.collapseInstance.hide();
    }
  }


  get userName(): string | null {
    return this.authService.getUserName();
  }

  get userEmail(): string | null {
    return this.authService.getUserEmail();
  }
}

