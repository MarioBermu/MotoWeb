import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hora-del-fin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hora-del-fin.component.html',
  styleUrl: './hora-del-fin.component.css'
})
export class HoraDelFinComponent {


startCountdown(): void {
  const fechaObjetivo = new Date("2050-12-31T23:59:59").getTime();

// Actualizar el temporizador cada segundo
  const x = setInterval(() => {
  // Obtener la fecha y hora actual
  const ahora = new Date().getTime();

  // Calcular la diferencia entre la fecha objetivo y la fecha actual
  const diferencia = fechaObjetivo - ahora;

  // Calcular días, horas, minutos y segundos
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  // Mostrar el resultado en el elemento con id "countdown"
  const countdownElement = document.getElementById("countdown");
  if (countdownElement) {
    countdownElement.innerHTML = `<h1>${dias}d ${horas}h ${minutos}m ${segundos}s</h1>
    <br>
    <h1 class='grande'>TICK TACK!⏳</h1>`;

  }

  // Si el temporizador ha llegado a cero, realizar alguna acción
  if (diferencia < 0) {
    clearInterval(x);
    if (countdownElement) {
      countdownElement.innerHTML = "¡Tiempo Cumplido!";
      // Puedes agregar aquí cualquier acción que desees realizar después de que la cuenta regresiva llegue a cero.
    }
  }
}, 1000); // Actualizar cada segundo
}
}
