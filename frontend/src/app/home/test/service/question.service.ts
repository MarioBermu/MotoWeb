import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";


@Injectable(
  {
  providedIn: 'root'
}
)
export class QuestionService {

  constructor(private http : HttpClient) { }

  getQuestionJson(){
    return this.http.get<any>("assets/preguntas.json");
  }


  // getQuestionJson(): Observable<any> {
  //   return this.http.get<any>('assets/preguntas.json').pipe(
  //     catchError((error: any) => {
  //       console.error('Error al cargar el JSON:', error);
  //       return throwError('Error al cargar el JSON');
  //     })
  //   );
  // }
}

