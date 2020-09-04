import { Component, OnInit, Input, ElementRef, ViewChildren, QueryList} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Enunciado } from '../model/enunciado';
import { OpcionMultiple } from '../model/opcionMultiple';
import { PreguntaAbierta } from '../model/preguntaAbierta';
import { Opcion } from '../model/opcion';

@Component({
  selector: 'app-visualizar-cuestionario',
  templateUrl: './visualizar-cuestionario.component.html',
  styleUrls: ['./visualizar-cuestionario.component.css']
})
export class VisualizarCuestionarioComponent implements OnInit {

  constructor(private ngbModal:NgbModal, public ngActive : NgbActiveModal) { }

  titulo : string;
  listaEnunciados: Enunciado[];
  listaTuplas : any[];
  logPreguntas : string[];

  @Input() actividad : any;

  @ViewChildren('resPA') respuestasPreguntasAbiertas : QueryList<ElementRef>;

  ngOnInit(): void {
    this.listaTuplas = new Array();
    this.listaEnunciados = this.convertirInputAInstacia();
    this.titulo = "Cuestionario";

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

  convertirInputAInstacia():Enunciado[]{
    var enunciados : Enunciado[] = new Array();
    let contE = 0;
    let contO = 0;
    for (const iterator of this.actividad.enunciados) {
      let enun : Enunciado = new Enunciado();
      enun.id = iterator.id;
      enun.enunciado = iterator.enunciado;
      enun.listaOpcionesMultiples = new Array();
      enun.listaPreguntasCompletar = new Array();
      enun.listaPreguntas = new Array();
      for (const op of iterator.listaOpcionesMultiples) {
        let opcionMultiple :OpcionMultiple = new OpcionMultiple();
        opcionMultiple.id = op.id;
        opcionMultiple.pregunta = op.pregunta;
        opcionMultiple.opciones = new Array();
        for (const p of op.opciones) {
          let opcion : Opcion = new Opcion();
          opcion.id = p.id;
          opcion.opcion = p.opcion;
          opcion.valor = p.valor;
          opcionMultiple.opciones.push(opcion);
        }
        this.listaTuplas.push([contE,contO,opcionMultiple.opciones.length -1]);
        enun.listaOpcionesMultiples.push(opcionMultiple);
        enun.listaPreguntas.push(opcionMultiple);
        contO++;
      }

      for (const pa of iterator.listaPreguntasCompletar) {
        let pregunta : PreguntaAbierta = new PreguntaAbierta();
        pregunta.id = pa.id;
        pregunta.palabraARellenar = pa.palabraARellenar;
        pregunta.texto = pa.texto;
        enun.listaPreguntasCompletar.push(pregunta);
        enun.listaPreguntas.push(pregunta);
      }
      enunciados.push(enun);
      contE++;
    }
    return enunciados;
  }

  traerRespuestasPreguntasAbiertas():string[]{
    let listaRespuestas :string [] = new Array();
    for (const iterator of this.respuestasPreguntasAbiertas) {
      listaRespuestas.push(iterator.nativeElement.value);
    }
    return listaRespuestas;
  }

  onChange(i:number, k: number, j:number){
    for (const iterator of this.listaTuplas) {
      if(iterator[1]===k && iterator[0] === i){
        iterator[2]=j;
      }
    }
  }
  
  obtenerIndiceValidos(preguta:OpcionMultiple):number{
    for (let index = 0; index < preguta.opciones.length; index++) {
      if(preguta.opciones[index].valor){
        return index;
     }
    }
    
  }

  validarFormulario(){
    let iteradorEnun = 1;
    let iteradorPregun = 0;
    let iteratorPreguntasAbiertas = 0;
    let iteratorPreguntasOp = 0;
    let listaRespuestasPA  = this.traerRespuestasPreguntasAbiertas();
    this.logPreguntas = new Array();
    for (const enun of this.listaEnunciados) {
      iteradorPregun = 1;
      for (const obj of enun.listaPreguntas) {
        if(this.isPreguntaAbierta){
          this.logPreguntas.push(''+iteradorEnun,".",'' +iteradorPregun,listaRespuestasPA[iteratorPreguntasAbiertas]
          === obj.palabraARellenar ? 'CORRECTO' : 'INCORRECTO')
          iteratorPreguntasAbiertas++;
        }else if(this.isOpcionMultiple){
          let tupla = this.listaTuplas[iteratorPreguntasOp];
          this.logPreguntas.push(''+iteradorEnun,".",'' +iteradorPregun, this.obtenerIndiceValidos(obj) === tupla[2] 
          ? 'CORRECTO' : 'INCORRECTO')
          iteratorPreguntasOp++;
        }
        iteradorPregun++;
      }
      iteradorEnun++;
    }
  }
}
