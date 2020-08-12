import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../model/user';

import { ModalService } from '../services/modal.service';
import { UserService } from '../services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  titulo: string = "Ingresar";
  user: User = new User();

  constructor(private _modalService: ModalService,
              private userService: UserService,
              private http: HttpClient) { }

  ngOnInit(): void {
    if(this.userService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.userService.user.nombre} ya estas autenticado`, 'info');
      this.userService.inOut = true;
    }
  }

  login() {
    if(this.user.email == null) {
      Swal.fire('Email', 'Debe ingresar el email', 'error');
    } else if(this.user.password == null) {
      Swal.fire('Contraseña', 'Debe ingresar la contraseña', 'error');
    } else {
      this.userService.login(this.user).subscribe(response => {
        this.userService.guardarUsuario(response.access_token);
        this.userService.guardarToken(response.access_token);

        let usuario = this.userService.user;

        Swal.fire('Bienvenido', `Hola ${usuario.nombre}, has iniciado sesión con exito`, 'success');
        this._modalService.cerrarModal();
        this.userService.inOut = true;
      }, err => {
        if (err.status == 400) {
          Swal.fire('Error login', 'Usuario o clave incorrecta', 'error');
        } else if(err.status == 401) {
          console.log(err);
        }
      });
    }
  }

  cerrarModal() {
    this._modalService.cerrarModal();
  }

  get modalService(): ModalService {
    return this._modalService;
  }
}
