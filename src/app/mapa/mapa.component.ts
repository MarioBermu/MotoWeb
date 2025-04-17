import { Component, OnInit } from '@angular/core';
import { RouteService, Route } from '../route.service';
import { FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  // Propiedades ya existentes...
  userLat: number = 0;
  userLng: number = 0;
  private map: any;
  private currentPolyline: any;



  // Agrega estas propiedades para el selector de rutas:
  routes: Route[] = [];
  selectedRouteId: string = '';  // Esto se enlaza en el select con ngModel

  constructor(private routeService: RouteService) {} // Inyecta el servicio de rutas

  ngOnInit(): void {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLat = position.coords.latitude;
          this.userLng = position.coords.longitude;
          this.loadMap();
          this.loadRoutes();
        },
        () => {
          this.userLat = 40.416775;
          this.userLng = -3.70379;
          this.loadMap();
          this.loadRoutes();
        }
      );
    }
  }

  async loadMap(): Promise<void> {
    const L = await import('leaflet');
    this.map = L.map('mapId').setView([this.userLat, this.userLng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    L.marker([this.userLat, this.userLng]).addTo(this.map)
      .bindPopup('¡Tú estás aquí!')
      .openPopup();
  }

  loadRoutes(): void {
    this.routeService.getRoutes().subscribe(
      (routes) => {
        this.routes = routes;
      },
      err => console.error('Error al cargar rutas:', err)
    );
  }

  selectRoute(routeId: string) {
    this.selectedRouteId = routeId;
    this.onRouteSelected();  // reutilizamos el método que ya tenía lógica de dibujo
  }

  async onRouteSelected(): Promise<void> {
    if (!this.selectedRouteId) return;
    const selected = this.routes.find(r => r._id === this.selectedRouteId);
    if (!selected) return;
    const L = await import('leaflet');
    if (this.currentPolyline) this.map.removeLayer(this.currentPolyline);

    const latlngs: L.LatLngTuple[] = selected.coordinates.map(c => [c[0], c[1]] as L.LatLngTuple);
    this.currentPolyline = L.polyline(latlngs, { color: 'blue', weight: 4 }).addTo(this.map);
    this.map.fitBounds(this.currentPolyline.getBounds());
  }



}
