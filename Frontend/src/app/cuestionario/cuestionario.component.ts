import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreguntaabiertaComponent } from '../preguntaabierta/preguntaabierta.component';
import { OpcionmultipleComponent } from '../opcionmultiple/opcionmultiple.component';
import { OpcionMultiple } from '../model/opcionMultiple';
import { PreguntaAbierta } from '../model/preguntaAbierta';
import { EnunciadoComponent } from '../enunciado/enunciado.component';
import { Enunciado } from '../model/enunciado';
import { ElegirEnunciadoComponent } from '../elegir-enunciado/elegir-enunciado.component';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit {

  listaPreguntas: any[];
  listaEnunciados: Enunciado[];
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listaPreguntas = new Array();
    this.listaEnunciados = new Array();
  }

  isOpcionMultiple(objeto: any): boolean {
    return objeto instanceof OpcionMultiple;
  }

  isPreguntaAbierta(objeto: any): boolean {
    return objeto instanceof PreguntaAbierta;
  }

  agregarEnunciado() {
    const modalRef = this.modalService.open(EnunciadoComponent);
    modalRef.result.then((r) => {
      this.listaEnunciados.push(r);
    });
  }

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

  sacarPalabraCompletar(item: number, index : number): string {
    let pregunta: string = this.listaEnunciados[index].listaPreguntas[item].texto;
    let palabra: string = this.listaEnunciados[index].listaPreguntas[item].palabraARellenar;
    pregunta = pregunta.replace(palabra, '-----------');
    return pregunta;
  }

}
