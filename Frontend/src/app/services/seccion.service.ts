import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Seccion } from '../model/seccion';
import { HttpParams,HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  private httpOptions = new HttpHeaders({'Content-Type':  'application/json'})

  constructor(private http: HttpClient,
              private userService: UserService) { }


  public crearSeccion(seccion: Seccion, idOA: number): Observable<any>{
    const url = 'http://localhost:9000/api/seccion/crearSeccion';
    let paramsO = new HttpParams();
    paramsO = paramsO.append('idOA', idOA.toString());

    let httpHeaders = new HttpHeaders();
    let token = this.userService.token;
    if(token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    return this.http.post<any>(url, seccion, {
      params: paramsO,
      headers: httpHeaders
    }).pipe(
      catchError( e => {
        if (this.userService.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire('error al crear la seccion', e.error.mensaje, 'error');
        return throwError(e);

      }

      )
    );


  }

  public listarSeccionesOA(idOA: number): Observable<any> {

    const url = 'http://localhost:9000/api/seccion/listarSeccionesOA';
    let paramsO = new HttpParams();
    paramsO = paramsO.append('idOA', idOA.toString());
    const httpOptions = {
      params: paramsO
    };
    return this.http.get<any>(url, httpOptions);

  }

  public buscarSeccionPorId(idSeccion: number): Observable<any> {

    const url = 'http://localhost:9000/api/seccion/buscarSeccion';
    let paramsO = new HttpParams();
    paramsO = paramsO.append('idSeccion', idSeccion.toString());
    const httpOptions = {
      params: paramsO
    };
    return this.http.get<any>(url, httpOptions);

  }

}
