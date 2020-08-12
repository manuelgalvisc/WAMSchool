import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

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
                private _modalService: ModalService,
                private route: Router) { }

    //Metodo get de usuario que obtiene el usuario del sessionStorage de lo
    //de lo contrario se crea un nuevo usuario
    public get user(): User {
      if(this._user != null) {
        return this._user;
      } else if(this._user == null && sessionStorage.getItem('usuario') != null) {
        this._user = JSON.parse(sessionStorage.getItem('usuario')) as User;
        return this._user;
      }
      return new User();
    }

    //Metodo get del token que obtiene un token del sessionStorage de lo contrario
    //retorna null
    public get token(): string {
      if(this._token != null) {
        return this._token;
      } else if(this._token == null && sessionStorage.getItem('usuario') != null) {
        this._token = sessionStorage.getItem('token');
        return this._token;
      }
      return null;
    }

    //Metodo que valida si el usuario esta autorizado para acceder a un elemento
    //o si ya expiró su token desde el backend.
    public isNoAutorizado(e): boolean {
      if(e.status==401) {
        if(this.isAuthenticated()) {
          this.logOut();
        }
        this.route.navigate(['/home']);
        this._modalService.abrirModal();
        return true;
      }if(e.status==403) {
        Swal.fire('Acceso denegado', `Hola ${this.user.nombre} no tiene permisos para acceder aquí`, 'warning');
        this.route.navigate(['/home']);
        return true;
      }
      return false;
    }

    //Metodo login que envía la información al backen para el inicio de sesión
    //con la autorización necesaria para oauth2
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

    //Guarda el usuario registrado o logeado en el sessionStorage
    guardarUsuario(accessToken: string): void {
      let payload = this.obtenerDatosToken(accessToken);
      this._user = new User();
      this._user.nombre = payload.nombre_usuario;
      this._user.apellido = payload.apellido_usuario;
      this._user.fechaNacimiento = payload.fecha_nacimiento;
      this._user.email = payload.user_name;
      sessionStorage.setItem('usuario', JSON.stringify(this._user));
    }

    //Guarda el token del usuario en el sessionStorage
    guardarToken(accessToken: string): void {
      this._token = accessToken;
      sessionStorage.setItem('token', this._token);
    }

    //Obtiene los datos del usuario con el token del sessionStorage
    obtenerDatosToken(accessToken: string): any {
      if(accessToken != null) {
          return JSON.parse(atob(accessToken.split(".")[1]));
      }
      return null;
    }

    //Metodo para registrar un usuario en la aplicación
    public registrarUsuario(usuario: User): Observable<any> {
      const url = 'http://localhost:9000/login/registrarUsuario';

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<any>(url,JSON.stringify(usuario), httpOptions);
    }

    //Validación si el usuario se encuentra auntenticado en la aplicación
    isAuthenticated(): boolean {
      let payload = this.obtenerDatosToken(this.token);
      if(payload != null && payload.user_name && payload.user_name.length>0) {
        return true;
      }
      return false;
    }

    //Método para eliminar un usuario del sessionStorage y deslogearse de la
    //aplicación
    logOut(): void {
      this._token = null;
      this._user = null;
      this.inOut = false;
      sessionStorage.clear();
    }

    //Método para agregar al header la autorización necesaria de oauth2
    public agregarAutorizacionHeader(httpOptions) {
      if(this.token != null) {
        return httpOptions.append('Authorization', 'Bearer ' + this.token);
      }
      return httpOptions;
    }

    //Método para verificar el role
    hasRole(role: string): boolean {
      console.log(this.user.role);
      if(this.user.role == role) {
        return true;
      }
      return true;
    }
  }
