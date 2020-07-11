import { Injectable } from '@angular/core';
import { ObjetoAprendizajeDTO } from '../DTOs/ObjetoAprendizajeDTO';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  objetoAprendizajeDTO: ObjetoAprendizajeDTO;
  constructor() { }
}
