import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalService } from '../services/modal.service';
import { User } from '../model/user';
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
              private userService: UserService) { }

  ngOnInit(): void {
  }

  login() {
    if(this.user.email == null) {
      Swal.fire('Email', 'Debe ingresar el email', 'error');
    } else if(this.user.password == null) {
      Swal.fire('Contraseña', 'Debe ingresar la contraseña', 'error');
    } else {
      this.userService.login(this.user).subscribe(json => {
        Swal.fire('Bienvenido', json.mensaje, 'success');
        this._modalService.cerrarModal();
      })
    }
  }

  cerrarModal() {
    this._modalService.cerrarModal();
  }

  get modalService(): ModalService {
    return this._modalService;
  }
}
