import { Injectable } from '@angular/core';
import { of,Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError, switchAll} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ObjetoAprendizaje } from '../model/objetoAprendizaje';

@Injectable({
  providedIn: 'root'
})
export class ObjetoAprendizajeService {

  private urlEndPoint;


  constructor(private http: HttpClient) { }

  // servicio encargado de crear un objeto de aprendizaje en la base de datos
  create(objetoAprendizaje: ObjetoAprendizaje): Observable<any>{

    this.urlEndPoint = 'http://localhost:9000/api/crearOA';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>(this.urlEndPoint, JSON.stringify(objetoAprendizaje), httpOptions).pipe(
      catchError( e => {
        console.error(e.error.mensaje);
        Swal.fire('error al crear el Objeto de Aprendizaje', e.error.mensaje, 'error');
        return throwError(e);
      }

      )
    )
  }



}
