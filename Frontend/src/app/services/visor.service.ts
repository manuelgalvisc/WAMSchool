import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { ObjetoAprendizajeDTO } from '../DTOs/ObjetoAprendizajeDTO';
import { concatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

export class VisorService {
  private _oa: ObjetoAprendizajeDTO;
  listNombres: String[] = new Array;

  constructor(private http: HttpClient,) {}

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

  public traerSecciones(idOA: number[]): any {
      const url = 'http://localhost:9000/api/seccion/listarSeccionesOA';
      return from(idOA).pipe(
        concatMap(id => <Observable<any>> this.http.get(url, {params: new HttpParams().append('idOA', id.toString())}))
      );
  }

  set oa(oa: ObjetoAprendizajeDTO) {
     this._oa = oa;
  }

  get oa(): ObjetoAprendizajeDTO {
    return this._oa;
  }
}
