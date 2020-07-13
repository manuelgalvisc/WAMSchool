import { Component, OnInit, } from '@angular/core';
import { CommonModule, } from '@angular/common';

import { User } from '../model/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registar-usuario',
  templateUrl: './registar-usuario.component.html',
  styleUrls: ['./registar-usuario.component.css'],
})
export class RegistarUsuarioComponent implements OnInit {
  user: User = new User();
  spassword: string = "";
  passwordValide: boolean = false;
  check: boolean = false;
  politicas: boolean = false;
  fechaValide: boolean = false;
  fechaActual: Date = new Date();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  create() {
    let fecha = new Date(this.user.fechaNacimiento);
    if(!this.check) {
      this.politicas=true;
    } else if (this.user.password != this.spassword) {
      this.passwordValide=true;
    } else if (fecha > this.fechaActual) {
      this.fechaValide=true;
    } else {
      this.userService.registrarUsuario(this.user).subscribe(json => {
        Swal.fire('Registro con exito', json.mensaje, 'success');
      });
    }
  }

}
