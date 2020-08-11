import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {map, catchError, switchAll} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(private http: HttpClient,
              private userService: UserService) { }

  subirArchivo(archivo: File, idPagina: number): Observable<any>{
    const urlEndPoint = 'http://localhost:9000/api/archivo/cargarArchivos';
    const formData = new FormData();
    formData.append('archivo' , archivo);
    formData.append('idPagina', idPagina.toString());
    let httpHeaders = new HttpHeaders();
    let token = this.userService.token;
    if(token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    let params0 = new HttpParams();
    return this.http.post<any>(urlEndPoint, formData,{
      headers: httpHeaders,
      params: params0,
    }).pipe(
      catchError( e => {
        console.error(e.error.mensaje);
        Swal.fire('error al guardar el archivo', e.error.mensaje, 'error');
        return throwError(e);

      }
      )
    )
  }
}
