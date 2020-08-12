import { Component, OnInit } from '@angular/core';
import { PreguntaAbierta } from '../model/preguntaAbierta';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-preguntaabierta',
  templateUrl: './preguntaabierta.component.html',
  styleUrls: ['./preguntaabierta.component.css']
})
export class PreguntaabiertaComponent implements OnInit {

  preguntaAbierta : PreguntaAbierta;
  mssError : string;
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.preguntaAbierta = new PreguntaAbierta();
    this.preguntaAbierta.palabraARellenar = "";
    this.preguntaAbierta.texto = "";
    this.mssError = "";
  }

  crear(){
    if(this.preguntaAbierta.texto.indexOf(this.preguntaAbierta.palabraARellenar) != -1){
      console.log(this.preguntaAbierta);
      this.activeModal.close(this.preguntaAbierta);
    }else{
      this.mssError = "La palabra no se encuentra en el texto";
    }
  }

}
