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
  coordinates: number[][] = [];

  constructor(
    private fb: FormBuilder,
    private routeService: RouteService
  ) {
    this.routeForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {

    if (typeof window === 'undefined') {
      return;
    }
    // Cargar Leaflet y Leaflet.Draw (ya incluidos en scripts/styles)
    const L = await import('leaflet');
    await import('leaflet-draw');

    // Inicializar mapa
    this.map = L.map('builderMapId').setView([41.15, 1.28], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Grupo para capas dibujadas
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

    // Escuchar evento de dibujo creado
    this.map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer;
      if (e.layerType === 'polyline') {
        // Extraer todos los puntos de la línea
        this.coordinates = layer.getLatLngs().map((p: any) => [p.lat, p.lng]);
      } else if (e.layerType === 'marker') {
        const p = layer.getLatLng();
        this.coordinates.push([p.lat, p.lng]);
      }
      this.drawnItems.addLayer(layer);
    });
  }

  onSave(): void {
    if (this.routeForm.invalid || this.coordinates.length === 0) {
      alert('Dale un nombre y dibuja al menos un punto o línea.');
      return;
    }
    const route: Route = {
      name: this.routeForm.value.name,
      coordinates: this.coordinates
    };
    this.routeService.createRoute(route).subscribe({
      next: () => {
        alert('Ruta guardada correctamente');
        this.routeForm.reset();
        this.drawnItems.clearLayers();
        this.coordinates = [];
      },
      error: err => alert('Error al guardar ruta: ' + (err.error.msg || err.message))
    });
  }
}
