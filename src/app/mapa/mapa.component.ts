import { Component, OnInit } from '@angular/core';
// No importar Leaflet de forma global

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  private map: any;
  userLat: number = 0;
  userLng: number = 0;

  constructor() { }

  ngOnInit(): void {
    // Asegúrate de que este código sólo se ejecute en el navegador
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLat = position.coords.latitude;
          this.userLng = position.coords.longitude;
          this.loadMap();  // Carga dinámica de Leaflet
        },
        (err) => {
          console.error(err);
          this.userLat = 40.416775;
          this.userLng = -3.70379;
          this.loadMap();
        }
      );
    } else {
      // En entornos donde no haya window (SSR), podemos no hacer nada o usar valores por defecto
      this.userLat = 40.416775;
      this.userLng = -3.70379;
    }
  }

  async loadMap(): Promise<void> {
    // Importa Leaflet dinámicamente
    const L = await import('leaflet');
    // Inicializa el mapa en el elemento con id 'mapId'
    this.map = L.map('mapId').setView([this.userLat, this.userLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([this.userLat, this.userLng]).addTo(this.map)
      .bindPopup('¡Tú estás aquí!')
      .openPopup();
  }
}
