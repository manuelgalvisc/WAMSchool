import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActividadEmparejamiento } from '../model/actividadEmparejamiento';
import { DragulaService } from 'ng2-dragula';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-actividad-match',
  templateUrl: './modal-actividad-match.component.html',
  styleUrls: ['./modal-actividad-match.component.css']
})
export class ModalActividadMatchComponent implements OnInit {
  @Input() actividad: ActividadEmparejamiento = new ActividadEmparejamiento();
  elementosIniciales: String[] = new Array();
  elementosAleatorios: String[] = new Array();
  puntuacion: number;

  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private dragulaService: DragulaService,) {
    this.dragulaService.createGroup("VAMPIRES", {

    });

    this.dragulaService.dropModel("VAMPIRES").subscribe(args => {
      console.log(args);
    });
  }

  ngOnInit(): void {
    for (let index = 0; index < this.actividad.parejas.length; index++) {
      this.elementosIniciales.push(this.actividad.parejas[index].cadena1);
      this.elementosAleatorios.push(this.actividad.parejas[index].cadena2);
    }
    this.elementosAleatorios = this.numerosAleatorios(this.elementosAleatorios);
  }

  numerosAleatorios(a: String[]): String[] {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

  comprobar() {
    this.puntuacion = 0;
    for (let i = 0; i < this.actividad.parejas.length; i++) {
      if(this.elementosAleatorios[i] === this.actividad.parejas[i].cadena2){
        this.puntuacion = this.puntuacion + 1;
      }
    }
    if(this.puntuacion > this.actividad.parejas.length/2){
        Swal.fire('Puntuación', `Has contestado ${this.puntuacion} de ${this.actividad.parejas.length}`, 'success');
    } else {
      Swal.fire('Puntuación', `Has contestado ${this.puntuacion} de ${this.actividad.parejas.length}`, 'error');
    }
  }
}
