import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraDelFinComponent } from './hora-del-fin.component';

describe('HoraDelFinComponent', () => {
  let component: HoraDelFinComponent;
  let fixture: ComponentFixture<HoraDelFinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoraDelFinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoraDelFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
