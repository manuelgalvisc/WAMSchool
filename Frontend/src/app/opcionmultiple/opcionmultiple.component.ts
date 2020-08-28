import { Component, OnInit } from '@angular/core';
import { OpcionMultiple } from '../model/opcionMultiple';
import { Opcion } from '../model/opcion';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-opcionmultiple',
  templateUrl: './opcionmultiple.component.html',
  styleUrls: ['./opcionmultiple.component.css']
})
/**
 * Componente auxiliar Modal para crear la pregunta del tipo opcion multiple
 * revisar padre cuestionario
 */
export class OpcionmultipleComponent implements OnInit {

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }
  opcionMultiple:OpcionMultiple;
  numeroOpciones:number;
  ingresoNumero:boolean;
  mostrarAlerta:boolean;

  mssError : string;
  ngOnInit(): void {
    this.opcionMultiple = new OpcionMultiple();
    this.numeroOpciones = 0;
    this.ingresoNumero = false;
    this.mostrarAlerta = false;
    this.mssError = "";
  }

  /**
   * Agrega la opcion 
   * @param num 
   */
  add(num : number){
    if(num > 1){
      this.numeroOpciones = num;
      this.ingresoNumero = true;
      this.mostrarAlerta = false;
      this.opcionMultiple.opciones = new Array();
      for (var _i = 0; _i < num; _i++) {
        var aux : Opcion  = new Opcion();
        aux.valor = false;
        aux.opcion = "";
        this.opcionMultiple.opciones.push(aux);
      }
    }else {
      this.mostrarAlerta = true;
    }
  }

  /**
   * crea la pregunta 
   */
  crear(){
    this.mssError = "";
    console.log(this.opcionMultiple);
    if( this.area() && this.validarOpciones() && this.existeVerdadero() ){
      this.activeModal.close(this.opcionMultiple);
      }
  }

  /**
   * valida las opciones para la pregunta 
   */
  validarOpciones() : boolean {
    for(let op of this.opcionMultiple.opciones){
      if(op.opcion.length < 1){
        this.mssError = this.mssError.concat(this.mssError,"\n\r Debe rellenar todas las opciones");
        return false;
      }
    }
    return true;
  }

  /**
   * valida que exista por lo menos una opcion verdadera
   */
  existeVerdadero():boolean{
    let cont  = 0;
    for(let op of this.opcionMultiple.opciones){
      if(op.valor === true){
        cont++;
      }
    }

    if(cont === 1 ){
      return true;
    }
    this.mssError = this.mssError.concat(this.mssError,"\n\r Tiene mas de dos opciones validas o no tiene ninguna");
    return false;
  }

  cambiarValor(numOpcion: number){
    this.opcionMultiple.opciones[numOpcion].valor = this.opcionMultiple.opciones[numOpcion].valor === true ? false : true;
  }

  /**
   * se valida que la pregunta se halla ingresado
   */
  area():boolean{
    if(this.opcionMultiple.pregunta != null && this.opcionMultiple.pregunta.length > 1){
      return true;
    }
    this.mssError = this.mssError.concat(this.mssError,"\n\r Debe diligenciar el campo de la pregunta");
    return false;
  }

}
