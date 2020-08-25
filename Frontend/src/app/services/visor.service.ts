import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ObjetoAprendizajeDTO } from '../DTOs/ObjetoAprendizajeDTO';
import { ArchivoDTO } from '../DTOs/ArchivoDTO';

@Injectable({
    providedIn: 'root'
  })

export class VisorService {
  private _oa: ObjetoAprendizajeDTO;

  constructor(private http: HttpClient) {}

  //Tomamos el Objeto seleccionado desde el Home
  guardarOA(oa: ObjetoAprendizajeDTO) {
    this._oa = oa;
    sessionStorage.setItem('oa', JSON.stringify(this._oa));
  }

  //Obtenemos el OA del sessionStorage.
  obtenerOA() {
    if(this._oa != null) {
      return this._oa;
    } else if(this._oa == null && sessionStorage.getItem('oa') != null) {
      this._oa = JSON.parse(sessionStorage.getItem('oa'));
      return this._oa;
    }
    return null;
  }

  //Servicio para obtener los archivos del backend
  obtenerArchivos(idPagina: number): Observable<any> {
    const url = 'http://localhost:9000/api/archivo/listarArchivos';

    let paramsO = new HttpParams();
    paramsO = paramsO.append('idPagina', idPagina.toString());
    const httpOptions = {
      params: paramsO
    };

    return this.http.get<any>(url, httpOptions);
  }

  //Convertimos los archivos en DTOs para hacer uso de ellos en la vista
  convertirADTO(idPagina: number): Array<ArchivoDTO> {
    var listaPaginas: Array<ArchivoDTO> = new Array;
    var listaPaginasFinal = new Array;
    this.obtenerArchivos(idPagina).subscribe(
      json =>{
        if(json.data != null){
          listaPaginas = json.data;
          listaPaginas.map((y) => {
            let archivo: ArchivoDTO = new ArchivoDTO();
            archivo.url = y.url;
            listaPaginasFinal.push(archivo);
          });
        }
      });
    return listaPaginasFinal;
  }

  set oa(oa: ObjetoAprendizajeDTO) {
     this._oa = oa;
  }

  get oa(): ObjetoAprendizajeDTO {
    return this._oa;
  }
}
