import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(public auth: AuthService) { }

  onSubmit() {
    this.auth.login(this.email, this.password);
  }
}
