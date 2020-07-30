import { Component, OnInit, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../model/user';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

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

  constructor(private userService: UserService,
              public auth: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  create() {
    let fecha = new Date(this.user.fechaNacimiento);
    if(!this.check) {
      this.politicas=true;
    } else if(this.user.nombre == undefined || this.user.apellido == undefined || this.user.email == undefined || this.user.fechaNacimiento == null || this.user.password == undefined) {
      Swal.fire('Debe ingresar los datos', 'Debe diligenciar todos los datos del formulario', 'error');
    } else if(this.user.password.length < 6) {
      Swal.fire('Contraseña', 'La contraseña debe tener mínimo 6 carácteres', 'error');
    } else if (this.user.password != this.spassword) {
      this.passwordValide=true;
    }else if (fecha > this.fechaActual) {
      this.fechaValide=true;
    } else {
      this.userService.registrarUsuario(this.user).subscribe(json => {
        Swal.fire('Registro con exito', json.mensaje, 'success');
        this.userService.inOut = true;
        this.router.navigate(['/']);
        this.auth.SingnUp(this.user.email, this.user.password);
      });
    }
  }

}
