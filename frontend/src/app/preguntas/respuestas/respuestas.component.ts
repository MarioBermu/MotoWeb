import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForoService } from '../../service/foro.service';
import { OnInit } from '@angular/core';
import { MensajeI } from '../../models/mensaje';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-respuestas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './respuestas.component.html',
  styleUrl: './respuestas.component.css'
})
export class RespuestasComponent implements OnInit {

  newmensaje: string='';
  name: string='';
  comments$: Observable<any[]> | undefined;


  constructor(public authService: AuthService, private foroService: ForoService, private router: Router) { }

  ngOnInit() {
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.comments$ = this.foroService.getPregunta();
  }

  publicarPregunta(newPregunta: string) {
    const nombre = this.userName || 'Anónimo';
    if (newPregunta.trim() !== '') {

      console.log('Publicando pregunta...');
      window.location.href = 'http://localhost:4200/preguntas';
      this.foroService.crearPregunta({ name: nombre, message: newPregunta }).subscribe(
        () => {



        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    }

  }
  get userName(): string | null {
    return this.authService.getUserName();
  }

  get userEmail(): string | null {
    return this.authService.getUserEmail();
  }
}

