import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {

  isEditing: boolean = false;
  // Lista de avatares (ruta en src/assets/avatars/)

  avatars: string[] = [
    '/assets/avatars/avatar1.png',
    '/assets/avatars/avatar2.png',
    '/assets/avatars/avatar3.png',
    '/assets/avatars/avatar4.png',
    '/assets/avatars/avatar5.png',
    '/assets/avatars/avatar6.png',
    '/assets/avatars/avatar7.png',
    '/assets/avatars/avatar8.png',
  ];

  // Avatar seleccionado (marca la opción y se guarda)
  selectedAvatar!: string;

  constructor(private http: HttpClient,
            public authService: AuthService,  // ← ahora público
            private router: Router             // ← lo necesitarás
) {}

  ngOnInit(): void {
    // Arranca con el avatar que haya en localStorage, o el primero
    this.selectedAvatar =
      localStorage.getItem('profileImage') || this.avatars[0];
  }

  // Getter que Angular lee continuamente para mostrar el avatar actual
  get profileImageUrl(): string {
    return localStorage.getItem('profileImage') || this.avatars[0];
  }

  // Nombre y email desde tu AuthService
  get userName(): string | null {
    return this.authService.getUserName();
  }
  get userEmail(): string | null {
    return this.authService.getUserEmail();
  }

irADashboardAdmin(): void {
  this.router.navigate(['/admin']);  // o la ruta que hayas definido
}


  onEditProfile(): void {
    this.isEditing = !this.isEditing;
  }

  // Seleccionar una opción de avatar
  selectAvatar(avatar: string): void {
    this.selectedAvatar = avatar;
  }

  // Guardar la selección en BD y en localStorage
  saveAvatar(): void {
    const userId = localStorage.getItem('userId');
    if (!userId || !this.selectedAvatar) return;

    this.http
      .post<{ profileImage: string }>(
        'http://localhost:3000/api/users/set-avatar',
        { userId, avatar: this.selectedAvatar }
      )
      .subscribe({
        next: (res) => {
          localStorage.setItem('profileImage', res.profileImage);

        },
        error: (err) => console.error(err),
      });
       this.isEditing = false;
  }
}
