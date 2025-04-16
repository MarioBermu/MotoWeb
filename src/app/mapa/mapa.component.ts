import { Component, OnInit } from '@angular/core';
import { RouteService, Route } from '../route.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  private map: any;
  userLat: number = 0;
  userLng: number = 0;

  constructor(private routeService: RouteService) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLat = position.coords.latitude;
          this.userLng = position.coords.longitude;
          this.loadMap();
        },
        (err) => {
          console.error(err);
          this.userLat = 40.416775;
          this.userLng = -3.70379;
          this.loadMap();
        }
      );
    } else {
      this.userLat = 40.416775;
      this.userLng = -3.70379;
      this.loadMap();
    }
  }

  async loadMap(): Promise<void> {
    // Importa Leaflet dinámicamente
    const L = await import('leaflet');

    // Inicializa el mapa
    this.map = L.map('mapId').setView([this.userLat, this.userLng], 13);

    // Agrega capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Agrega marcador para la ubicación del usuario
    L.marker([this.userLat, this.userLng]).addTo(this.map)
      .bindPopup('¡Tú estás aquí!')
      .openPopup();

    // Recupera y dibuja rutas desde el backend
    this.routeService.getRoutes().subscribe(
      (routes: Route[]) => {
        routes.forEach(route => {
          // Convierte cada coordenada a un LatLngTuple, es decir, [number, number]
          const latlngs: L.LatLngTuple[] = route.coordinates.map(coord => [coord[0], coord[1]] as L.LatLngTuple);
          L.polyline(latlngs, { color: 'blue' }).addTo(this.map)
            .bindPopup(route.name);
        });
      },
      err => console.error('Error al cargar rutas:', err)
    );
  }
}
