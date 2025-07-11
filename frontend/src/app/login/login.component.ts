import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginResponse } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    public auth: AuthService,
    private router: Router    // inyectamos Router
  ) {}

  onSubmit(): void {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: LoginResponse) => {
        // Guardamos en localStorage
        localStorage.setItem('auth_token', res.token);
        const { id, username, email: userEmail, profileImage, role } = res.user;
        localStorage.setItem('user_email', userEmail);
        localStorage.setItem('user_name', username);
        localStorage.setItem('profileImage', profileImage || '/assets/avatars/avatar1.png');
        localStorage.setItem('userId', id);
        localStorage.setItem('userRole', role);

        this.auth.loggedInUsers.next(username);
        // Navegamos al perfil
        this.router.navigate(['/perfil']);
      },
      error: err => {
        console.error('Error al iniciar sesión:', err);
        alert(err.error?.msg || 'Error al iniciar sesión');
      }
    });
  }
}
