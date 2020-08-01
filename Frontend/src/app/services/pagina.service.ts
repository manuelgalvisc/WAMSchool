import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Pagina } from '../model/pagina';
import { HttpParams,HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {

  constructor(private http: HttpClient) { }

  public crearSeccion(pagina: Pagina): Observable<any>{
    const url = 'http://localhost:9000/api/seccion/crearSeccion'

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<any>(url, pagina, httpOptions).pipe(

      catchError( e => {
        console.error(e.error.mensaje);
        Swal.fire('error al crear la seccion', e.error.mensaje, 'error');
        return throwError(e);

      }

      )
    );


  }
}
