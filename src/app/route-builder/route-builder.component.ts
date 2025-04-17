import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteService, Route } from '../route.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-route-builder',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './route-builder.component.html',
  styleUrls: ['./route-builder.component.css']
})
export class RouteBuilderComponent implements OnInit {
  map: any;
  drawControl: any;
  drawnItems: any;
  routeForm: FormGroup;
  coordinates: [number, number][] = [];

  constructor(
    private fb: FormBuilder,
    private routeService: RouteService
  ) {
    this.routeForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    // Sólo corre en el navegador
    if (typeof window === 'undefined') {
      return;
    }

    // Import dinámico de Leaflet y Leaflet‑Draw
        const L = await import('leaflet');
        await import('leaflet-draw');

    // Inicializar mapa
    this.map = L.map('builderMapId').setView([41.15, 1.28], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Grupo de capas dibujadas
    this.drawnItems = new L.FeatureGroup();
    this.map.addLayer(this.drawnItems);

    // Herramientas de dibujo
    this.drawControl = new L.Control.Draw({
      edit: { featureGroup: this.drawnItems },
      draw: {
        polyline: {},
        marker: {},
        polygon: false,
        circle: false,
        rectangle: false,
        circlemarker: false
      }
    });
    this.map.addControl(this.drawControl);

    // Evento al crear
    this.map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer;
      if (e.layerType === 'polyline') {
        this.coordinates = layer.getLatLngs().map((p: any) => [p.lat, p.lng]);
      } else if (e.layerType === 'marker') {
        const p = layer.getLatLng();
        this.coordinates.push([p.lat, p.lng]);
      }
      this.drawnItems.addLayer(layer);
    });
  }

  private haversine(a: [number, number], b: [number, number]): number {
    const toRad = (x: number) => x * Math.PI / 180;
    const [lat1, lon1] = a.map(toRad);
    const [lat2, lon2] = b.map(toRad);
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const R = 6371; // km
    const h = Math.sin(dLat/2)**2
            + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon/2)**2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  /** Suma distancias de la ruta */
  private computeTotalDistance(coords: [number, number][]): number {
    let total = 0;
    for (let i = 1; i < coords.length; i++) {
      total += this.haversine(coords[i-1], coords[i]);
    }
    return Math.round(total * 100) / 100; // 2 decimales
  }


  onSave(): void {
    if (this.routeForm.invalid || this.coordinates.length < 2) {
      alert('Nombre requerido y al menos 2 puntos.');
      return;
    }
    const distance = this.computeTotalDistance(this.coordinates);
    const route: Route = {
      name: this.routeForm.value.name,
      coordinates: this.coordinates,
      distance
    };
    this.routeService.createRoute(route).subscribe({
      next: () => {
        alert(`Ruta guardada (${distance} km)`);
        alert('Ruta guardada correctamente');
        this.routeForm.reset();
        this.drawnItems.clearLayers();
        this.coordinates = [];

      },
      error: err => alert('Error al guardar ruta: ' + (err.error.msg || err.message))
    });
  }
}
