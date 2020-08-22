import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ActividadCuestionario } from '../model/actividadCuestionario';
import { HttpParams,HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ActividadcuestionarioService {

  private httpOptions = new HttpHeaders({'Content-Type':  'application/json'})

  constructor(private http: HttpClient,
              private userService: UserService) { }


  public crearCuestionario(actividad: ActividadCuestionario): Observable<any>{
    const url = 'http://localhost:9000/api/actividadCuestionario/crear';

    let httpHeaders = new HttpHeaders();
    let token = this.userService.token;
    if(token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    return this.http.post<any>(url, actividad, {
      headers: httpHeaders
    }).pipe(
      catchError( e => {
        if (this.userService.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire('error al crear la seccion', e.error.mensaje, 'error');
        return throwError(e);

      }

      )
    );


  }
}
