import { Injectable } from '@angular/core';
import { ObjetoAprendizajeDTO } from '../DTOs/ObjetoAprendizajeDTO';
import { SeccionDTO } from '../DTOs/SeccionDTO';
import { Seccion } from '../model/seccion';
import { ConsultasService } from '../services/consultas.service';
import { SeccionService } from './seccion.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  objetoAprendizajeDTO: ObjetoAprendizajeDTO;
  constructor(private seccionService: SeccionService) {

   }

  traerListaSecciones(idOA: number): Array<Seccion> {
    var listaSecciones: Array<SeccionDTO> = [];
    var listaSeccionesFinal : Array<Seccion> = [];
    this.seccionService.listarSeccionesOA(idOA).subscribe(
      json =>{
        if(json.data != null){
          listaSecciones = json.data;
          listaSecciones.map((y) => {
            listaSeccionesFinal.push(this.convertirSeccionDTOASeccion(y));
          }
          )
        }
      }
    )
    return listaSeccionesFinal;
  }

  convertirSeccionDTOASeccion(dto : SeccionDTO):Seccion{
    let seccion :Seccion  = new Seccion();
      seccion.id = dto.idSeccion;
      seccion.nombreSeccion = dto.nombreSeccion;
      seccion.descripcion = dto.descripcion;
      seccion.posInOA = dto.posInOA;
      seccion.objetoAprendizaje = dto.idOA;
    return seccion;
  }
}
