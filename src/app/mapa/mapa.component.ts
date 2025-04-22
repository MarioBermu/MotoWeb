import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouteService, Route } from '../route.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, OnDestroy {
  private watchId!: number;
  userLat = 0;
  userLng = 0;
  map!: any;
  userMarker!: any;
  currentPolyline!: any;
  routes: Route[] = [];
  selectedRouteId = '';

  constructor(
    private routeService: RouteService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Solo en cliente
    if (!isPlatformBrowser(this.platformId)) return;

    this.startGeolocationWatch();
  }

  ngOnDestroy(): void {
    if (this.watchId != null) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  private startGeolocationWatch(): void {
    this.watchId = navigator.geolocation.watchPosition(
      pos => {
        this.userLat = pos.coords.latitude;
        this.userLng = pos.coords.longitude;
        if (!this.map) {
          this.initMapAndRoutes();
        } else if (this.userMarker) {
          this.userMarker.setLatLng([this.userLat, this.userLng]);
        }
      },
      err => {
        console.warn('Geolocation falló, usando fallback', err);
        this.userLat = 41.1188827;
        this.userLng = 1.2444909;
        if (!this.map) {
          this.initMapAndRoutes();
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  private async initMapAndRoutes(): Promise<void> {
    // Dynamic import solo en cliente
    const leafletModule = await import('leaflet');
    const L = leafletModule.default;
    const { Icon } = leafletModule;

    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/leaflet/images/marker-icon-2x.png',
      iconUrl:        'assets/leaflet/images/marker-icon.png',
      shadowUrl:      'assets/leaflet/images/marker-shadow.png'
    });

    this.map = L.map('mapId').setView([this.userLat, this.userLng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Marcador de usuario almacenado para futuras actualizaciones
    this.userMarker = L.marker([this.userLat, this.userLng])
      .addTo(this.map)
      .bindPopup('¡Tú estás aquí!')
      .openPopup();

    this.loadRoutes();
  }

  /**
   * Botón para refrescar manualmente la ubicación
   */
  refreshLocation(): void {
    console.log('🔄 refreshLocation invocado');
    // primero detengo el watch actual
    if (this.watchId != null) {
      navigator.geolocation.clearWatch(this.watchId);
    }

    // forzamos nueva geolocalización y recarga
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.userLat = pos.coords.latitude;
        this.userLng = pos.coords.longitude;
        if (this.map && this.userMarker) {
          this.userMarker.setLatLng([this.userLat, this.userLng]);
          this.map.setView([this.userLat, this.userLng]);
          this.userMarker.openPopup();
        }
        // AHORA recargo para que el navegador vuelva a iniciar todo el API
        window.location.reload();
      },
      err => {
        console.warn('Error al actualizar ubicación', err);
        // y aún así recargo para limpiar caché
        window.location.reload();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  loadRoutes(): void {
    this.routeService.getRoutes().subscribe({
      next: routes => {
        this.routes = routes;
      },
      error: err => console.error('Error cargando rutas:', err)
    });
  }

  async selectRoute(id: string): Promise<void> {
    this.selectedRouteId = id;
    const sel = this.routes.find(r => r._id === id);
    if (!sel) return;

    if (this.currentPolyline) {
      this.map.removeLayer(this.currentPolyline);
    }
    const latlngs = sel.coordinates.map(c => [c[0], c[1]] as [number, number]);
    const L = (await import('leaflet')).default;
    this.currentPolyline = L.polyline(latlngs, { color: 'blue', weight: 4 }).addTo(this.map);
    this.map.fitBounds(this.currentPolyline.getBounds());
  }

  getPreviewPoints(route: Route): string {
    const coords = route.coordinates;
    if (!coords.length) return '';
    let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
    coords.forEach(([lat, lng]) => {
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
    });
    const latRange = maxLat - minLat || 1;
    const lngRange = maxLng - minLng || 1;
    const W = 100, H = 50;
    return coords.map(([lat, lng]) => {
      const x = ((lng - minLng) / lngRange) * W;
      const y = H - ((lat - minLat) / latRange) * H;
      return `${x},${y}`;
    }).join(' ');
  }
}
