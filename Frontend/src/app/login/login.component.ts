import { Component, OnInit } from '@angular/core';

import { ModalService } from '../services/modal.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _modalService: ModalService,
              public userService: UserService) { }

  ngOnInit() {
  }

  login(){
    this.abrirModal();
  }

  signOut(): void {
    this.userService.inOut = false;
  }

  abrirModal() {
    this._modalService.abrirModal();
  }

  get modalService(): ModalService {
    return this._modalService;
  }
}
