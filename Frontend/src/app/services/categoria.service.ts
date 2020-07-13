import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria';
import { of,Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError, switchAll} from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private urlEndPoint = 'http://localhost:9000/api/listarCategorias';


  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint).pipe(
      catchError( e =>{
        console.error(e.error.mensaje);
        Swal.fire('error al cargar las categorias', e.error.mensaje, 'error');
        return throwError(e);

      }

      )
    )
  }
}
