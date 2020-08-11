import { Injectable } from '@angular/core';
import { ObjetoAprendizajeDTO } from '../DTOs/ObjetoAprendizajeDTO';

@Injectable({
    providedIn: 'root'
  })

export class VisorService {
  private _oa: ObjetoAprendizajeDTO;

  set oa(oa: ObjetoAprendizajeDTO) {
     this._oa = oa;
  }

  get oa(): ObjetoAprendizajeDTO {
    return this._oa;
  }
}
