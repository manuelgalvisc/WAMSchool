import { Component, OnInit,  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Enlace } from '../model/enlace';


@Component({
  selector: 'app-modalenlacesvideos',
  templateUrl: './modalenlacesvideos.component.html',
  styleUrls: ['./modalenlacesvideos.component.css']
})
export class ModalenlacesvideosComponent implements OnInit {

  titulo : string;
  enlace : Enlace;
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { 
  }

  ngOnInit(): void {
    this.titulo = "Enlazar Videos";
    this.enlace = new Enlace();
  }

  agregarEnlace(){
    if(this.enlace.nombre.length > 0 && this.enlace.url.length === 11){
      this.activeModal.close(this.enlace);
    }
  }
}