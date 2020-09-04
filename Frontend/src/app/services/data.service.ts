import { Ahorcado } from './../model/ahorcado';
import { Enlace } from './../model/enlace';
import { PaginaService } from './pagina.service';
import { SeccionDTO } from './../DTOs/SeccionDTO';
import { Injectable } from '@angular/core';
import { ObjetoAprendizajeDTO } from '../DTOs/ObjetoAprendizajeDTO';
import { Seccion } from '../model/seccion';
import { ConsultasService } from '../services/consultas.service';
import { SeccionService } from './seccion.service';
import { PaginaDTO } from '../DTOs/PaginaDTO';
import { Pagina } from '../model/pagina';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  objetoAprendizajeDTO: ObjetoAprendizajeDTO;
  Archivo: File;
  seccionDTO: SeccionDTO;
  ahorcado: Ahorcado;
  modoEdicion = true;
  constructor(private seccionService: SeccionService,
              private paginaService: PaginaService) {

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

  traerListaPaginas(idSeccion: number): Array<Pagina> {
    var listaPaginas: Array<PaginaDTO> = [];
    var listaPaginasFinal : Array<Pagina> = [];
    this.paginaService.listarPaginas(idSeccion).subscribe(
      async json =>{
        if(json.data != null){
          listaPaginas = json.data;
          await listaPaginas.map((y) => {
            listaPaginasFinal.push(this.convertirPaginaDTOAPagina(y));
          });
        }
      });
    return listaPaginasFinal;
  }

  convertirPaginaDTOAPagina(dto : PaginaDTO): Pagina{
    let pagina: Pagina = new Pagina();
    pagina.id = dto.idPagina;
    pagina.nombrePagina = dto.nombrePagina;
    pagina.seccion = dto.idSeccion;
    pagina.tipo = dto.tipo;
    pagina.contenidoPagina = dto.contenidoPagina;
    return pagina;
  }

}
