import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
