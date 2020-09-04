import { Ahorcado } from './../model/ahorcado';
import { Injectable } from '@angular/core';
import { of, Observable, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {map, catchError, switchAll, concatMap} from 'rxjs/operators';
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

  /**
   * Metodo encargado de craer la actividad tipo ahorcado
   * @param ahorcado
   * @param idSeccion
   */
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

  public listarAhorcados(idSeccion:number):Observable<any>{
    const url = 'http://localhost:9000/api/actividad/listarAhorcados';
    let httpHeaders = new HttpHeaders();
    let params0 = new HttpParams();
    params0 = params0.append('idSeccion', idSeccion.toString());

    return this.http.get<any>(url, {
      headers: httpHeaders,
      params: params0,
    });

  }
  public buscarAhorcadoPorId(idAhorcado: number): Observable<any> {

    const url = 'http://localhost:9000/api/actividad/buscarAhorcado';
    let paramsO = new HttpParams();
    paramsO = paramsO.append('idAhorcado', idAhorcado.toString());
    const httpOptions = {
      params: paramsO
    };
    return this.http.get<any>(url, httpOptions);

  }


  /**
   *
   * @param actividad Metodo encargado de crear las actividades de tipo Cuestionario
   * @param idSeccion
   */
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

   /**
   * 
   * @param actividad Metodo encargado de crear las actividades de tipo Cuestionario
   * @param idSeccion 
   */
  public consultarCuestionarioPorSeccion(idSeccion:number): Observable<any>{
    const url = 'http://localhost:9000/api/actividad/consultarCuestionarios';

    let httpHeaders = new HttpHeaders();
    let token = this.userService.token;
    if(token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    let params0 = new HttpParams();
    params0 = params0.append('idSeccion',idSeccion.toString());

    return this.http.get<any>(url,{
      headers: httpHeaders,
      params:params0,
    }).pipe(
      catchError( e => {
        if (this.userService.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire('error al consultar las actividades', e.error.mensaje, 'error');
        return throwError(e);
      }
      )
    );
  }

  /**
   * Metodo enacargado de crear las actividades detipo emparejamiento
   * @param actividad 
   * @param idSeccion 
   */
  public crearEmparejamiento(actividad: ActividadEmparejamiento,idSeccion:number): Observable<any>{
    const url = 'http://localhost:9000/api/actividad/crearEmparejamiento';

    let params0 = new HttpParams();
    params0 = params0.append('idSeccion',idSeccion.toString());

    return this.http.post<any>(url, actividad,{
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

  public consultarActividadEmparejamientoPorSeccion(idSeccion:number): Observable<any>{
    const url = 'http://localhost:9000/api/actividad/consultarEmparejamientos';

    let params0 = new HttpParams();
    params0 = params0.append('idSeccion',idSeccion.toString());

    return this.http.get<any>(url,{
      params:params0,
    }).pipe(
      catchError( e => {
        if (this.userService.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire('error al consultar las actividades', e.error.mensaje, 'error');
        return throwError(e);
      }
      )
    );
  }
}


