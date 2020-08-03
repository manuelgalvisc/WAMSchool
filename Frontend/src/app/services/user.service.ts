import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../model/user';
import { ModalService } from '../services/modal.service';

@Injectable({
    providedIn: 'root'
  })

  export class UserService {

    private _user: User;
    private _token: string;
    inOut: boolean = false;

    constructor(private http: HttpClient,
                private _modalService: ModalService) { }

    public get user(): User {
      if(this._user != null) {
        return this._user;
      } else if(this._user == null && sessionStorage.getItem('usuario') != null) {
        this._user = JSON.parse(sessionStorage.getItem('usuario')) as User;
        return this._user;
      }
      return new User();
    }

    public get token(): string {
      if(this._token != null) {
        return this._token;
      } else if(this._token == null && sessionStorage.getItem('usuario') != null) {
        this._token = sessionStorage.getItem('token');
        return this._token;
      }
      return null;
    }

    public isNoAutorizado(e): boolean {
      if(e.status==401 || e.status==403) {
        this._modalService.abrirModal();
        return true;
      }
      return false;
    }

    public login(usuario:User):Observable<any>{
      const urlEndpoint = 'http://localhost:9000/oauth/token';
      const credenciales = btoa('angularapp' + ':' + '12345');
      const httpHeaders = new HttpHeaders({
                          'Content-Type':'application/x-www-form-urlencoded',
                          'Authorization':'Basic ' + credenciales});

      let params = new URLSearchParams();

      params.set('grant_type', 'password');
      params.set('username', usuario.email);
      params.set('password', usuario.password);

      return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
    }

    guardarUsuario(accessToken: string): void {
      let payload = this.obtenerDatosToken(accessToken);
      this._user = new User();
      this._user.nombre = payload.nombre_usuario;
      this._user.apellido = payload.apellido_usuario;
      this._user.fechaNacimiento = payload.fecha_nacimiento;
      this._user.email = payload.user_name;
      sessionStorage.setItem('usuario', JSON.stringify(this._user));
    }

    guardarToken(accessToken: string): void {
      this._token = accessToken;
      sessionStorage.setItem('token', this._token);
    }

    obtenerDatosToken(accessToken: string): any {
      if(accessToken != null) {
          return JSON.parse(atob(accessToken.split(".")[1]));
      }
      return null;
    }

    public registrarUsuario(usuario: User): Observable<any> {
      const url = 'http://localhost:9000/login/registrarUsuario';

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<any>(url,JSON.stringify(usuario), httpOptions);
    }

    isAuthenticated(): boolean {
      let payload = this.obtenerDatosToken(this.token);
      if(payload != null && payload.user_name && payload.user_name.length>0) {
        return true;
      }
      return false;
    }

    logOut(): void {
      this._token = null;
      this._user = null;
      this.inOut = false;
      sessionStorage.clear();
    }

    public agregarAutorizacionHeader(httpOptions) {
      if(this.token != null) {
        return httpOptions.append('Authorization', 'Bearer ' + this.token);
      }
      return httpOptions;
    }
  }
