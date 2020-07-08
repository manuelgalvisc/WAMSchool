import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal-login/modal-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  banderaLogin: boolean = false;

  constructor(private _modalService: ModalService) { }

  ngOnInit() {

  }

  login(){
    this.abrirModal();
  }

  signOut(): void {

  }

  abrirModal() {
    this._modalService.abrirModal();
  }

  get modalService(): ModalService {
    return this._modalService;
  }
}
