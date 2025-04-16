import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RespuestasComponent } from './respuestas/respuestas.component';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [CommonModule, RespuestasComponent],
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.css'
})
export class PreguntasComponent {

}
