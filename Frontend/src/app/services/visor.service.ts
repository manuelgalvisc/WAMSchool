import { Injectable } from '@angular/core';
import { ObjetoAprendizajeDTO } from '../DTOs/ObjetoAprendizajeDTO';

@Injectable({
    providedIn: 'root'
  })

export class VisorService {
  private _oa: ObjetoAprendizajeDTO;

  guardarOA(oa: ObjetoAprendizajeDTO) {
    this._oa = oa;
    sessionStorage.setItem('oa', JSON.stringify(this._oa));
  }

  obtenerOA() {
    if(this._oa != null) {
      return this._oa;
    } else if(this._oa == null && sessionStorage.getItem('oa') != null) {
      this._oa = JSON.parse(sessionStorage.getItem('oa'));
      return this._oa;
    }
    return null;
  }

  set oa(oa: ObjetoAprendizajeDTO) {
     this._oa = oa;
  }

  get oa(): ObjetoAprendizajeDTO {
    return this._oa;
  }
}
