import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { User } from '../model/user';

import { ModalService } from '../services/modal.service';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

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
              public auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  login() {
    if(this.user.email == null) {
      Swal.fire('Email', 'Debe ingresar el email', 'error');
    } else if(this.user.password == null) {
      Swal.fire('Contraseña', 'Debe ingresar la contraseña', 'error');
    } else if(this.user.password.length < 6) {
      Swal.fire('Contraseña', 'La contraseña debe contener mínimo 6 cáracteres!', 'error');
    }else {
      try {
        this.userService.login(this.user).subscribe(json => {
          Swal.fire('Bienvenido', json.mensaje, 'success');
          this._modalService.cerrarModal();
          this.userService.inOut = true;
          this.auth.SignIn(this.user.email, this.user.password);
        })
      } catch (err) {
        Swal.fire('Error al ingresar el usuario', err.error.mensaje, 'error');
      }
    }
  }

  cerrarModal() {
    this._modalService.cerrarModal();
  }

  get modalService(): ModalService {
    return this._modalService;
  }
}
