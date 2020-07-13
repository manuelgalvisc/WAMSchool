import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';


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
  }