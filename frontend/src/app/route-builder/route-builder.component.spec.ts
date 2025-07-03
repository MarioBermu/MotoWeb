import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteBuilderComponent } from './route-builder.component';

describe('RouteBuilderComponent', () => {
  let component: RouteBuilderComponent;
  let fixture: ComponentFixture<RouteBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouteBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
