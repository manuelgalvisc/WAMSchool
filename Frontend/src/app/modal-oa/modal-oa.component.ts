import { Component, OnInit, Input, Directive} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ObjetoAprendizajeDTO } from '../DTOs/ObjetoAprendizajeDTO';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-oa',
  templateUrl: './modal-oa.component.html',
  styleUrls: ['./modal-oa.component.css']
})
/**
 * Modal encargado de mostrar la info del oa
 */
export class ModalOaComponent implements OnInit {

  @Input() oa : ObjetoAprendizajeDTO;
  titulo: string = "Descripción OA";
  mostrarCategorias : boolean;
  mostrarSecciones : boolean;
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.mostrarCategorias = false;
    this.mostrarSecciones = false;
  }

  isActivo():boolean{
    return this.oa.estadoOA === 'ACTIVO';
  }

  /**
   * muestra las secciones si el oa tiene 
   */
  mc(){
    this.mostrarCategorias = this.mostrarCategorias == true ? false : true; 
  }

  /**
   * mostrar secciones si el oa tiene 
   */
  ms(){
    this.mostrarSecciones = this.mostrarSecciones == true ? false : true;
  }

  seccionesUndefined(): boolean{
    return this.oa.secciones === undefined || this.oa.secciones.length===0 ;
  } 


}
