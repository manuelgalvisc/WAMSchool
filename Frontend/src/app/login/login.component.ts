import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { ModalService } from '../services/modal.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * Componente encardo de levantar el ingreso del usuario
 */
export class LoginComponent implements OnInit {

  constructor(private _modalService: ModalService,
              public userService: UserService,
              public router: Router) { }

  ngOnInit() {
  }

  /**
   * metodo que carga el modal para el login
   */
  login(){
    this.abrirModal();
  }

  /**
   * metodo encargado de bajar el usuario
   */
  signOut(): void {
    Swal.fire('LogOut', `Hasta pronto ${this.userService.user.nombre} has cerrado sesión con éxito`, 'success');
    this.userService.logOut();
    this.router.navigate(['/home']);
  }

  abrirModal() {
    this._modalService.abrirModal();
  }

  get modalService(): ModalService {
    return this._modalService;
  }
}
