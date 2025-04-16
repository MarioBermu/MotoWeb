import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaComponent } from './mapa.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RouteService } from '../route.service';

describe('MapaComponent', () => {
  let component: MapaComponent;
  let fixture: ComponentFixture<MapaComponent>;

  const dummyRoutes = [
    { _id: '1', name: 'Ruta de prueba 1', coordinates: [[40.416775, -3.70379], [40.420000, -3.705000]] },
    { _id: '2', name: 'Ruta de prueba 2', coordinates: [[50.416775, -3.70379], [40.422000, -3.700000]] }
  ];

  const routeServiceMock = {
    getRoutes: () => of(dummyRoutes)
  };

  beforeAll(() => {
    // No reasignamos navigator.geolocation (es de solo lectura),
    // sino que interceptamos getCurrentPosition y le asignamos una implementación dummy.
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((
      success: PositionCallback,
      error?: PositionErrorCallback
    ) => {
      const coords: GeolocationCoordinates = {
        latitude: 40.416775,
        longitude: -3.70379,
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        toJSON: () => ({
          latitude: 40.416775,
          longitude: -3.70379,
          accuracy: 10,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null
        })
      };

      const position: GeolocationPosition = {
        coords: coords,
        timestamp: Date.now(),
        toJSON: function () {
          throw new Error('Function not implemented.');
        }
      };

      success(position);
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: RouteService, useValue: routeServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
