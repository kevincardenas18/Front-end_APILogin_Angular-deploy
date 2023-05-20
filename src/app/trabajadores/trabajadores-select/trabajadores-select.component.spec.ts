import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadoresSelectComponent } from './trabajadores-select.component';

describe('TrabajadoresSelectComponent', () => {
  let component: TrabajadoresSelectComponent;
  let fixture: ComponentFixture<TrabajadoresSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajadoresSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrabajadoresSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
