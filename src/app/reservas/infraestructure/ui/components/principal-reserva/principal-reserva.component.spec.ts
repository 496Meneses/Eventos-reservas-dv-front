import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalReservaComponent } from './principal-reserva.component';

describe('PrincipalReservaComponent', () => {
  let component: PrincipalReservaComponent;
  let fixture: ComponentFixture<PrincipalReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalReservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
