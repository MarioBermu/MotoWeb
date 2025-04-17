import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Route {
  _id?: string;
  name: string;
  coordinates: number[][]; // Array de [lat, lng]
  distance?: number; // Distancia en metros
}

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private apiUrl = 'http://localhost:3000/api/routes';

  constructor(private http: HttpClient) { }

  getRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(this.apiUrl);
  }

  createRoute(route: Route): Observable<any> {
    return this.http.post<any>(this.apiUrl, route);
  }
}
