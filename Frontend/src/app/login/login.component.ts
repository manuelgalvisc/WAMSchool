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
export class LoginComponent implements OnInit {

  constructor(private _modalService: ModalService,
              public userService: UserService,
              public router: Router) { }

  ngOnInit() {
  }

  login(){
    this.abrirModal();
  }

  signOut(): void {
    this.userService.logOut();
    Swal.fire('LogOut', `Hola ${this.userService.user.nombre} has cerrado sesión con éxito`, 'success');
    this.router.navigate(['/home']);
  }

  abrirModal() {
    this._modalService.abrirModal();
  }

  get modalService(): ModalService {
    return this._modalService;
  }
}
