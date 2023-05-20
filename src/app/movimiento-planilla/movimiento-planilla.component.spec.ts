import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoPlanillaComponent } from './movimiento-planilla.component';

describe('MovimientoPlanillaComponent', () => {
  let component: MovimientoPlanillaComponent;
  let fixture: ComponentFixture<MovimientoPlanillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientoPlanillaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientoPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
