import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Pagina } from '../model/pagina';
import { HttpParams,HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {

  private httpOptions = new HttpHeaders({'Content-Type':  'application/json'});

  constructor(private http: HttpClient,
              private userService: UserService) { }

  public crearPagina(pagina: Pagina,idSeccion:number): Observable<any>{
    const url = 'http://localhost:9000/api/pagina/crearPagina'

    let httpHeaders = new HttpHeaders();
    let token = this.userService.token;
    if(token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    let params0 = new HttpParams();
    params0 = params0.append('idSeccion',idSeccion.toString());

    return this.http.post<any>(url, pagina, {
      headers: httpHeaders,
      params: params0,
    }).pipe(
      catchError( e => {
        if (this.userService.isNoAutorizado(e)) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire('error al crear la pagina', e.error.mensaje, 'error');
        return throwError(e);

      }

      )
    );


  }

  public listarPaginas(idSeccion:number):Observable<any>{
    const url = 'http://localhost:9000/api/pagina/listarPaginas';

    let httpHeaders = new HttpHeaders();
    /*let token = this.userService.token;
    if(token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }*/

    let params0 = new HttpParams();
    params0 = params0.append('idSeccion', idSeccion.toString());

    return this.http.get<any>(url, {
      headers: httpHeaders,
      params: params0,
    })/*.pipe(
      catchError( e => {
        if (this.userService.isNoAutorizado(e)) {
          return throwError(e);
        }
        Swal.fire('error al listar las paginas', e.error.mensaje, 'error');
        return throwError(e);

      }

      )
    )*/;

  }
}
