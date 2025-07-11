// foro.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForoService } from '../service/foro.service';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css'],
})
export class ForoComponent implements OnInit {
  newmensaje = '';
  comments$!: Observable<any[]>;

  constructor(
    public authService: AuthService,
    private foroService: ForoService
  ) {}

  ngOnInit() {
    this.cargarMensajes();
  }

  cargarMensajes() {
    this.comments$ = this.foroService.getMensajes();
  }

  publicarMensaje() {
    const nombre = this.userName || 'Anónimo';
    const msg = this.newmensaje.trim();
    if (!msg) return;

    this.foroService.crearMensaje({ name: nombre, message: msg }).subscribe({
      next: () => {
        // 1) Vacio el textarea
        this.newmensaje = '';
        // 2) Recargo la lista de comentarios
        this.cargarMensajes();
      },
      error: (error) => console.error('Error al publicar mensaje:', error)
    });
  }

  get userName(): string | null {
    return this.authService.getUserName();
  }
}
