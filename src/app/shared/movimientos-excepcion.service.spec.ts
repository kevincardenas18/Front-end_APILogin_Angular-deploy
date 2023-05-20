import { TestBed } from '@angular/core/testing';

import { MovimientosExcepcionService } from './movimientos-excepcion.service';

describe('MovimientosExcepcionService', () => {
  let service: MovimientosExcepcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimientosExcepcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
