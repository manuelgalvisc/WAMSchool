import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarUsuarioComponent } from './registar-usuario.component';

describe('RegistarUsuarioComponent', () => {
  let component: RegistarUsuarioComponent;
  let fixture: ComponentFixture<RegistarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
