import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Enunciado } from '../model/enunciado';

@Component({
  selector: 'app-enunciado',
  templateUrl: './enunciado.component.html',
  styleUrls: ['./enunciado.component.css']
})
export class EnunciadoComponent implements OnInit {

  mssError : string;
  enun:Enunciado;
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.mssError = "";
    this.enun = new Enunciado();
    this.enun.enunciado = "";
    this.enun.listaOpcionesMultiples = new Array();
    this.enun.listaPreguntasCompletar = new Array();
    this.enun.listaPreguntas = new Array();
  }

  crear(){
    this.mssError = "";
    if(this.enun.enunciado.length > 0){
      this.activeModal.close(this.enun);
    }else{
      this.mssError = "Por favor ingrese un enunciado";
    }
  }

}
