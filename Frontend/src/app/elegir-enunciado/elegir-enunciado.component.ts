import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Enunciado } from '../model/enunciado';

@Component({
  selector: 'app-elegir-enunciado',
  templateUrl: './elegir-enunciado.component.html',
  styleUrls: ['./elegir-enunciado.component.css']
})
/**
 * Componente auxiliar que nos permite elegir el componente al cual se le va a agregar la pegunta 
 * revisar componente cuestionario, es el padre de este,recibe una lista de enunciados de este 
 */
export class ElegirEnunciadoComponent implements OnInit {

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  @Input() listaEnunciados : Enunciado[];

  ngOnInit(): void {
    
  }

  enviar(numero:number){
    this.activeModal.close(numero);
  }

}
