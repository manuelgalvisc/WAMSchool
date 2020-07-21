import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { Categoria } from '../model/categoria';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
    providedIn: 'root'
  })

  export class ConsultasService {

    constructor(private http: HttpClient) { }


    public listasOA():Observable<any>{

      const url = 'http://localhost:9000/api/listarOA';

      return this.http.get<any>(url);
    }

    public listasOApag(pagina:number):Observable<any>{

        const url = 'http://localhost:9000/api/listarOApag';

        let params = new HttpParams();
        params = params.append('pagina',pagina.toString());

        return this.http.get<any>(url,{params});
      }

      public filtrarPorCategorias(categoria: Categoria[],pagina:number):Observable<any>{

        const url = 'http://localhost:9000/api/listarOAcategorias';
        let paramsO = new HttpParams();
        paramsO = paramsO.append('pagina',pagina.toString());

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          }),
          params : paramsO
        };

        return this.http.post<any>(url, categoria,httpOptions).pipe(
          catchError( e => {
            console.error(e.error.mensaje);
            Swal.fire('error al filtrar por categoria', e.error.mensaje, 'error');
            return throwError(e);

          }

          )
        )

      }

      public filtrarPorTexto(texto: string,pagina:number):Observable<any>{

        const url = 'http://localhost:9000/api/listarOAtexto';
        let paramsO = new HttpParams();
        paramsO = paramsO.append('texto',texto);
        paramsO = paramsO.append('pagina',pagina.toString());

        const httpOptions = {
          params : paramsO
        };

        return this.http.get<any>(url,httpOptions).pipe(
          catchError( e => {
            console.error(e.error.mensaje);
            Swal.fire('error al filtrar por texto', e.error.mensaje, 'error');
            return throwError(e);

          }

          )
        )

      }
  }
