import { ActividadService } from './../services/actividad.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreguntaabiertaComponent } from '../preguntaabierta/preguntaabierta.component';
import { OpcionmultipleComponent } from '../opcionmultiple/opcionmultiple.component';
import { OpcionMultiple } from '../model/opcionMultiple';
import { PreguntaAbierta } from '../model/preguntaAbierta';
import { EnunciadoComponent } from '../enunciado/enunciado.component';
import { Enunciado } from '../model/enunciado';
import { ElegirEnunciadoComponent } from '../elegir-enunciado/elegir-enunciado.component';
import { ActividadCuestionario } from '../model/actividadCuestionario';
import Swal from 'sweetalert2';
import { Seccion } from '../model/seccion';
import { DataService } from '../services/data.service';

/**
 * componente que se encarga de crear el componente que crea la actividad cuestionario
 */
@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit {

  listaEnunciados: Enunciado[];
  actividad: ActividadCuestionario;
  mssError:string;
  constructor(private modalService: NgbModal,private actividadService:ActividadService,
    private dataservice:DataService) { }

  ngOnInit(): void {
    this.listaEnunciados = new Array();
    this.actividad = new ActividadCuestionario();
    this.actividad.introduccion = "";
    this.actividad.enunciados = new Array();
    this.mssError = "";
  }

  /**
   * se valida que es opcion multiple
   * @param objeto 
   */
  isOpcionMultiple(objeto: any): boolean {
    return objeto instanceof OpcionMultiple;
  }

  /**
   * se valida que sea pregunta abierta 
   * @param objeto 
   */
  isPreguntaAbierta(objeto: any): boolean {
    return objeto instanceof PreguntaAbierta;
  }

  /**
   * crea el modal que se encarga de crear los enunciados
   */
  agregarEnunciado() {
    const modalRef = this.modalService.open(EnunciadoComponent);
    modalRef.result.then((r) => {
      this.listaEnunciados.push(r);
    });
  }

  /**
   * agregar la opcion multiple, mediante un modal y seleccinando un enunciado 
   */
  agregarOpcionMultiple() {
    const modalRef = this.modalService.open(ElegirEnunciadoComponent);
    modalRef.componentInstance.listaEnunciados = this.listaEnunciados;
    var numero: number = 0;
    modalRef.result.then((r) => {
      numero = r;
      const modalRef_2 = this.modalService.open(OpcionmultipleComponent);
      modalRef_2.result.then((a) => {
        this.listaEnunciados[numero].listaOpcionesMultiples.push(a);
        this.listaEnunciados[numero].listaPreguntas.push(a);
      });
    });
  }

  /**
   * agregar una pregunta abierta para un enunciado
   */
  agregarPreguntaAbierta() {
    const modalRef = this.modalService.open(ElegirEnunciadoComponent);
    modalRef.componentInstance.listaEnunciados = this.listaEnunciados;
    var numero: number = 0;
    modalRef.result.then((r) => {
      numero = r;
      const modalRef_2 = this.modalService.open(PreguntaabiertaComponent);
      modalRef_2.result.then((a) => {
        this.listaEnunciados[numero].listaPreguntasCompletar.push(a);
        this.listaEnunciados[numero].listaPreguntas.push(a);
      });
    });

  }

  /**
   * saca la palabra que se va a completar del texto
   * @param item 
   * @param index 
   */
  sacarPalabraCompletar(item: number, index : number): string {
    let pregunta: string = this.listaEnunciados[index].listaPreguntas[item].texto;
    let palabra: string = this.listaEnunciados[index].listaPreguntas[item].palabraARellenar;
    pregunta = pregunta.replace(palabra, '-----------');
    return pregunta;
  }

  /**
   * elimina una actividad del tipo pregunta abierta 
   * @param index 
   * @param index_2 
   */
  eliminarActividadPreguntaAbierta(index :number, index_2:number){
    let preguntaEliminada : any =this.listaEnunciados[index].listaPreguntas.splice(index_2,1);
    let i : number;
    let valor : number;
    for(let p of this.listaEnunciados[index].listaPreguntasCompletar){
      if(p.palabraARellenar === preguntaEliminada.palabraARellenar && p.texto === preguntaEliminada.texto){
        valor = i;
      }
      i++;
    }
    this.listaEnunciados[index].listaPreguntasCompletar.slice(valor,1);
  }

  /**
   * eliminar actividad del tipo opcion multiple
   * @param index 
   * @param index_2 
   */
  eliminarActividadopcionMultiple(index :number, index_2:number){
    let preguntaEliminada : any =this.listaEnunciados[index].listaPreguntas.splice(index_2,1);
    let i : number;
    let valor : number;
    for(let p of this.listaEnunciados[index].listaOpcionesMultiples){
      if(p.pregunta === preguntaEliminada.pregunta && p.opciones.length === preguntaEliminada.opciones.length){
        valor = i;
      }
      i++;
    }
    this.listaEnunciados[index].listaOpcionesMultiples.slice(valor,1);
  }

  /**
   * elimina el enunciado
   * @param index 
   */
  eliminarEnunciado(index : number){
    this.listaEnunciados.splice(index,1);
  }

  /**
   * metodo crear, se encarga de validar que hallan enunciado creados correctamente 
   */
  crear(){
    this.mssError = "";
    if(this.actividad.introduccion!= null && this.actividad.introduccion.length > 0
      && this.enunciadoBienContruido() ){
        this.actividad.enunciados = this.listaEnunciados;
        console.log(this.actividad);
        this.actividadService.crearCuestionario(this.actividad,this.dataservice.seccionDTO.idSeccion).subscribe((json) => {
          if ( json.data != null){
            Swal.fire('Nueva actividad', `creada con exito !`, 'success');
            console.log(json.data);
          }
        });
      }else{
        this.mssError = this.mssError.concat("La Introducción se encuentra vacía.");
      }
  }

  /**
   * Se valida que el enunciado se encuentre bien construido
   */
  enunciadoBienContruido():boolean{
    for(let item of this.listaEnunciados){
      if(item.listaPreguntas.length === 0){
        this.mssError = "Hay enunciados mal construidos, o sin preguntas.";
        return false;
      }
    }
    return true;
  }

}
