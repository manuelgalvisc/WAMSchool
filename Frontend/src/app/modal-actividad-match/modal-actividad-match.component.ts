import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActividadEmparejamiento } from '../model/actividadEmparejamiento';

@Component({
  selector: 'app-modal-actividad-match',
  templateUrl: './modal-actividad-match.component.html',
  styleUrls: ['./modal-actividad-match.component.css']
})
export class ModalActividadMatchComponent implements OnInit {
  @Input() actividad: ActividadEmparejamiento = new ActividadEmparejamiento();
  elementosIniciales: String[] = new Array();
  elementosAleatorios: String[] = new Array();
  posicionesAleatorias: Number[] = new Array();

  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    for (let index = 0; index < this.actividad.parejas.length; index++) {
      this.elementosIniciales.push(this.actividad.parejas[index].cadena1);
    }
    //this.numerosAleatorios();
  }

  numerosAleatorios() {
    let bandera: boolean = true;
    while(bandera){
      let numero = Math.floor(Math.random() * (this.actividad.parejas.length - 0)) + 0;
      if(this.posicionesAleatorias.indexOf(numero) != -1) {
        this.posicionesAleatorias.push(numero);
      }
      if(this.posicionesAleatorias.length == this.actividad.parejas.length) {
        bandera = false;
      }
    }
    console.log(this.posicionesAleatorias);

  }
}
