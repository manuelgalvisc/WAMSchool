import { Router } from '@angular/router';
import { ActividadService } from './../services/actividad.service';
import { Ahorcado } from './../model/ahorcado';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mostrar-ahorcado',
  templateUrl: './mostrar-ahorcado.component.html',
  styleUrls: ['./mostrar-ahorcado.component.css']
})
export class MostrarAhorcadoComponent implements OnInit {

  ahorcado: Ahorcado = new Ahorcado();
  indicioPalabra = "";
  title = "Ahorcado";
  pattern = new RegExp('^[A-Z]+$', 'i');
  palabra = ""
  palabraGuardar = "";
  modoEdicion = true;
  palabraOculta = "";
  intentos = 0;
  gano = false;
  perdio = false;
  letras = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  constructor(public activeModal: NgbActiveModal,
              public dataService: DataService) {
    this.palabraOculta = "_ ".repeat(this.palabra.length);
  }

  ngOnInit() {
    if(this.dataService.modoEdicion === false){
      this.palabra = this.dataService.ahorcado.palabraOculta;
      this.indicioPalabra = this.dataService.ahorcado.indicio;
      this.palabraOculta = "_ ".repeat(this.palabra.length);
    }
  }

  /**
   * comprobamos que la letra ingresada se encuentre en la palabra
   * @param letra
   */
  comprobar(letra) {
    this.existeLetra(letra);
    const palabraOcultaArreglo = this.palabraOculta.split(" ");
    for (let i = 0; i <= this.palabra.length; i++) {
      if (this.palabra[i] === letra) {
        palabraOcultaArreglo[i] = letra;
      }
    }
    this.palabraOculta = palabraOcultaArreglo.join(" ");
    this.verificaGanador();
  }

  /**
   * se encarga de verificar si hay ganador
   */
  verificaGanador() {
    const palabraArr = this.palabraOculta.split(" ");
    const palabraEvaluar = palabraArr.join("");

    if (palabraEvaluar === this.palabra) {
      this.gano = true;
      console.log("Usuario GANO");
    }
    if (this.intentos === 9) {
      this.perdio = true;
      console.log("Usuario perdio");
    }
  }

  /**
   * se verifica qye la letra existe en la paalabra
   * @param letra
   */
  existeLetra(letra) {
    if (this.palabra.indexOf(letra) >= 0) {
      //console.log("La letra existe" + letra);
    } else {
      this.intentos++;
    }

  }



}
