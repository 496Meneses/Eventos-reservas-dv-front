import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalEventosComponent } from './principal-eventos.component';

describe('PrincipalEventosComponent', () => {
  let component: PrincipalEventosComponent;
  let fixture: ComponentFixture<PrincipalEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalEventosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
