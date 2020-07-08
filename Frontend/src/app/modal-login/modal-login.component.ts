import { Component, OnInit, Input } from '@angular/core';

import { ModalService } from './modal-service';
import { User } from '../login/user';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  titulo: string = "Ingresar";
  user: User = new User();

  constructor(private _modalService: ModalService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this._modalService.cerrarModal();
  }

  get modalService(): ModalService {
    return this._modalService;
  }
}
