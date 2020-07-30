import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Seccion } from '../model/seccion';
import { HttpParams,HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SeccionService {


  constructor(private http: HttpClient) { }

  public crearSeccion(seccion: Seccion, idOA: number): Observable<any>{
    const url = 'http://localhost:9000/api/seccion/crearSeccion';
    let paramsO = new HttpParams();
    paramsO = paramsO.append('idOA', idOA.toString());

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      params : paramsO
    };

    return this.http.post<any>(url, seccion, httpOptions).pipe(

      catchError( e => {
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
}
