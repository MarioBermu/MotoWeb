import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNosotrosComponent } from './page-nosotros.component';

describe('PageNosotrosComponent', () => {
  let component: PageNosotrosComponent;
  let fixture: ComponentFixture<PageNosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNosotrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
