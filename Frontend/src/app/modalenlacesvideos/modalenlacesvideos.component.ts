import { DataService } from './../services/data.service';
import { EnlaceService } from './../services/enlace.service';
import { Component, OnInit,  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Enlace } from '../model/enlace';


@Component({
  selector: 'app-modalenlacesvideos',
  templateUrl: './modalenlacesvideos.component.html',
  styleUrls: ['./modalenlacesvideos.component.css']
})
/**
 * Componente auxiliar para crear los enlaces a youtube , revisra componente crear pagina, es su padre
 */
export class ModalenlacesvideosComponent implements OnInit {

  titulo : string;
  enlace : Enlace;
  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private dataService: DataService,
              private enlaceService: EnlaceService) {
  }

  ngOnInit(): void {
    this.titulo = "Enlazar Videos";
    this.enlace = new Enlace();
  }

  /**
   * metodo que agrega los enlaces en el componente padre
   */
  agregarEnlace(){
    if(this.enlace.nombre.length > 0 && this.enlace.url.length === 11){
      this.activeModal.close(this.enlace);
      this.enlaceService.listaEnlaces.push(this.enlace);
    }
  }
}
