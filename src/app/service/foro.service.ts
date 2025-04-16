import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MensajeI } from '../models/mensaje';
import { JwtResponseI } from '../models/jwt-response';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ForoService {
  AUTH_SERVER: string = 'http://localhost:3000/api/foro';
  AUTH_SERVER_PRE: string = 'http://localhost:3000/api/preguntas';
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) {

  }
crearMensaje(mensaje:{name: string, message: string}): Observable<any> {

  return this.httpClient.post<any>(`${this.AUTH_SERVER}`,mensaje );

    }

    getMensajes(): Observable<any> {
      return this.httpClient.get<any[]>(`${this.AUTH_SERVER}`);
    }

    crearPregunta(mensaje:{name: string, message: string}): Observable<any> {
      return this.httpClient.post<any>(`${this.AUTH_SERVER_PRE}`,mensaje );
    }

    getPregunta(): Observable<any> {
      return this.httpClient.get<any[]>(`${this.AUTH_SERVER_PRE}`);
    }

    }
