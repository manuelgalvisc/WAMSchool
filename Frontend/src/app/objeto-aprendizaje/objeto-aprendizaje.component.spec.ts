import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetoAprendizajeComponent } from './objeto-aprendizaje.component';

describe('ObjetoAprendizajeComponent', () => {
  let component: ObjetoAprendizajeComponent;
  let fixture: ComponentFixture<ObjetoAprendizajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjetoAprendizajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetoAprendizajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
