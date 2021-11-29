import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable, throwError, from } from 'rxjs';
import { Enlace } from '../model/enlace';
import { catchError, concatMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EnlaceService {

  listaEnlaces: Array<Enlace> = new Array<Enlace>();
  constructor(private http: HttpClient,
              private userService: UserService) { }

  private httpOptions = new HttpHeaders({'Content-Type':  'application/json'});

  public crearEnlace(enlace: Enlace,idPagina: number): Observable<any>{
    const url = 'http://localhost:9000/api/enlace/crearEnlace'

    let httpHeaders = new HttpHeaders();
    let token = this.userService.token;
    if(token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    let params0 = new HttpParams();
    params0 = params0.append('idPagina', idPagina.toString());

    return this.http.post<any>(url, enlace, {
      headers: httpHeaders,
      params: params0,
    }).pipe(
      catchError( e => {
        if (this.userService.isNoAutorizado(e)) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire('error al crear el enlace', e.error.mensaje, 'error');
        return throwError(e);

      }

      )
    );

  }

  public listarEnlaces(idPagina: number[]): any{
    const url = 'http://localhost:9000/api/enlace/listarEnlaces';
    return from(idPagina).pipe(
      concatMap(id => <Observable<any>> this.http.get(url, {params: new HttpParams().append('idPagina', id.toString())}))
    )
  }
}
