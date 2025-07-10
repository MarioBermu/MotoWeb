// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    profileImage: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private apiUrl = 'http://localhost:3000/api/auth';
  public loggedInUsers = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    const savedName = this.getUserName();
    if (savedName) this.loggedInUsers.next(savedName);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      { email, password }
    );
  }

  // auth.service.ts
register(username: string, email: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/register`, { username, email, password });
}


  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_name');
      localStorage.removeItem('profileImage');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
    }
    this.loggedInUsers.next('');
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

  getUserRole(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;
  }

  /** Método que usas en tu navbar: */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
