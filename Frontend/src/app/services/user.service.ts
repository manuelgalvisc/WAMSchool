import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from '../model/user';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
  })

  export class UserService {

    private User: User;

    constructor(private http: HttpClient) { }


    public login(usuario:User):Observable<any>{

      const url = 'http://localhost:9000/login/signIn';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      return this.http.post<any>(url,JSON.stringify(usuario), httpOptions).pipe(catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire('Error al ingresar', e.error.mensaje, 'error');
        return throwError(e);
      }));
    }

    public registrarUsuario(usuario: User): Observable<any> {
      const url = 'http://localhost:9000/login/registrarUsuario';

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      return this.http.post<any>(url,JSON.stringify(usuario), httpOptions).pipe(catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire('Error al ingresar el usuario', e.error.mensaje, 'error');
        return throwError(e);
      }));
    }
  }
