import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarObjetoAprendizajeComponent } from './editar-objeto-aprendizaje.component';

describe('EditarObjetoAprendizajeComponent', () => {
  let component: EditarObjetoAprendizajeComponent;
  let fixture: ComponentFixture<EditarObjetoAprendizajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarObjetoAprendizajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarObjetoAprendizajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
