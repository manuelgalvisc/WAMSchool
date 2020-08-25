import { Ahorcado } from './../model/ahorcado';
import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {map, catchError, switchAll} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserService } from './user.service';
import { ActividadCuestionario } from '../model/actividadCuestionario';
import { ActividadEmparejamiento } from '../model/actividadEmparejamiento';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private httpOptions = new HttpHeaders({'Content-Type':  'application/json'});
  constructor(private http: HttpClient,
              private userService: UserService) { }

   public crearAhorcado(ahorcado: Ahorcado, idSeccion: number): Observable<any>{
    const url = 'http://localhost:9000/api/actividad/crearAhorcado'

    let httpHeaders = new HttpHeaders();
    let token = this.userService.token;
    if(token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    let params0 = new HttpParams();
    params0 = params0.append('idSeccion',idSeccion.toString());

    return this.http.post<any>(url, ahorcado, {
      headers: httpHeaders,
      params: params0
    }).pipe(
      catchError( e => {
        if (this.userService.isNoAutorizado(e)) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire('error al crear el ahorcado', e.error.mensaje, 'error');
        return throwError(e);

      }

      )
    );


  }

  public crearCuestionario(actividad: ActividadCuestionario,idSeccion:number): Observable<any>{
    const url = 'http://localhost:9000/api/actividad/crearCuestionario';

    let httpHeaders = new HttpHeaders();
    let token = this.userService.token;
    if(token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    let params0 = new HttpParams();
    params0 = params0.append('idSeccion',idSeccion.toString());

    return this.http.post<any>(url, actividad,{
      headers: httpHeaders,
      params:params0,
    }).pipe(
      catchError( e => {
        if (this.userService.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire('error al crear la actividad', e.error.mensaje, 'error');
        return throwError(e);
      }
      )
    );
  }

  public crearEmparejamiento(actividad: ActividadEmparejamiento,idSeccion:number): Observable<any>{
    const url = 'http://localhost:9000/api/actividad/crearEmparejamiento';

    let httpHeaders = new HttpHeaders();
    let token = this.userService.token;
    if(token != null) {
      //httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
      httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    }
    let params0 = new HttpParams();
    params0 = params0.append('idSeccion',idSeccion.toString());

    console.log(actividad);
    return this.http.post<any>(url, actividad,{
      headers: httpHeaders,
      params:params0,
    }).pipe(
      catchError( e => {
        if (this.userService.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire('error al crear la actividad', e.error.mensaje, 'error');
        return throwError(e);
      }
      )
    );
  }
}
