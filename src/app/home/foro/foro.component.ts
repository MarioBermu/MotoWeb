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
  selector: 'app-foro',
  styleUrls: ['./foro.component.css'],  // Cambiado de styleUrl a styleUrls
  standalone: true,  // No estoy seguro de para qué se utiliza standalone, pero debería estar bien si lo necesitas.
  imports: [CommonModule, FormsModule],
  templateUrl: './foro.component.html'
})
export class ForoComponent implements OnInit {
  newmensaje: string='';
  name: string='';
  comments$: Observable<any[]> | undefined;


  constructor(public authService: AuthService, private foroService: ForoService, private router: Router) { }

  ngOnInit() {
    this.cargarMensajes();
  }

  cargarMensajes() {
    this.comments$ = this.foroService.getMensajes();
  }



  publicarMensaje(newmensaje: string) {
    const nombre = this.userName || 'Anónimo';
    if (newmensaje.trim() !== '') {

      console.log('Publicando mensaje...');
      window.location.href = 'http://localhost:4200/home';
      this.foroService.crearMensaje({ name: nombre, message: newmensaje }).subscribe(
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
