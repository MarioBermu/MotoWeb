import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { Observable, BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private apiUrl = 'http://localhost:3000/api/auth';
  public loggedInUsers = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {
    const savedName = this.getUserName();
    if (savedName) this.loggedInUsers.next(savedName);  }

  login(email: string, password: string) {
    this.http.post<any>(`${this.apiUrl}/login`, { email, password }).subscribe(
      res => {
        // ⚠️ Comprobamos que estamos en el navegador antes de usar localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem(this.tokenKey, res.token);
          localStorage.setItem('user_email', res.email);
          localStorage.setItem('user_name', res.username);
        }

        this.loggedInUsers.next(res.username);
        this.router.navigate(['/']);
      },
      err => {
        alert(err.error.msg || 'Error al iniciar sesión');
      }
    );
  }

  register(username: string, email: string, password: string) {
    this.http.post<any>(`${this.apiUrl}/register`, { username, email, password }).subscribe(
      res => {
        alert(res?.msg || '¡Registro exitoso!');
        this.router.navigate(['/login']);
      },
      err => {
        console.error(err);
        const errorMsg = err?.error?.msg || 'Error al registrarse';
        alert(errorMsg);
      }
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_name');
    }
    this.loggedInUsers.next('');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(this.tokenKey) : null;
  }

  getUserName(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('user_name') : null;
  }

  getUserEmail(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('user_email') : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }


}
