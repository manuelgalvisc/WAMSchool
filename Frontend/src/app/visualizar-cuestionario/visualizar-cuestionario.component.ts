import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Enunciado } from '../model/enunciado';
import { OpcionMultiple } from '../model/opcionMultiple';
import { PreguntaAbierta } from '../model/preguntaAbierta';

@Component({
  selector: 'app-visualizar-cuestionario',
  templateUrl: './visualizar-cuestionario.component.html',
  styleUrls: ['./visualizar-cuestionario.component.css']
})
export class VisualizarCuestionarioComponent implements OnInit {

  constructor(private ngbModal:NgbModal, public ngActive : NgbActiveModal) { }

  titulo : string;
  listaEnunciados: Enunciado[];
  @Input() actividad : any;
  ngOnInit(): void {
    this.listaEnunciados = this.actividad.enunciados;
    this.llenarListasPreguntas();
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
    for (const iterator of this.actividad.enunciados) {
      let enun : Enunciado = new Enunciado();
      enun.id = iterator.id;
      enun.enunciado = iterator.enunciado;
      enun.listaOpcionesMultiples = new Array();
      enun.listaPreguntasCompletar = new Array();
      enun.listaPreguntas = new Array();
    }
    return enunciados;
  }
}
