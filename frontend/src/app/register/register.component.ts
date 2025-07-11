import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./register.component.css'],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.auth.register(this.username, this.email, this.password)
      .subscribe({
        next: res => {
          alert(res.msg || '¡Registro exitoso!');
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Error al registrarse:', err);
          alert(err.error?.msg || 'Error al registrarse');
        }
      });
  }
}
