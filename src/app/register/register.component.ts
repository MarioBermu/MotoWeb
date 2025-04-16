import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [FormsModule],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(public auth: AuthService) {}

  onSubmit() {
    this.auth.register(this.username, this.email, this.password);
  }
}
