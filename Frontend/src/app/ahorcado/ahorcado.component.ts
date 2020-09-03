import { Router } from '@angular/router';
import { ActividadService } from './../services/actividad.service';
import { Ahorcado } from './../model/ahorcado';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
/**
 * Componente encargado de realizar la actividad de ahorcado
 */
export class AhorcadoComponent {

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
  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private actividadService: ActividadService,
              private dataService: DataService,
              private router: Router) {
    this.palabraOculta = "_ ".repeat(this.palabra.length);
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

  /**
   * Se guarda la palabra  del ahorcado
   */
  guardarPalabra(){
    if(this.palabraGuardar.length !== 0 && this.indicioPalabra.length !== 0){
      if(this.pattern.test(this.palabraGuardar)){
        this.palabraGuardar = this.palabraGuardar.toLowerCase();
        this.palabra = this.palabraGuardar;
        this.palabraOculta = "_ ".repeat(this.palabra.length);
        this.ahorcado.palabraOculta = this.palabra.toLowerCase();
        this.ahorcado.indicio = this.indicioPalabra;
        this.actividadService.crearAhorcado(this.ahorcado, this.dataService.seccionDTO.idSeccion).subscribe(
          json =>{
            if (json.data != null) {
              Swal.fire('Nuevo Ahorcado  creado con exito !!', 'success');
              this.router.navigate(['/editarSeccion']);
            }
          }
        )
      }else{
        Swal.fire('la palabra contiene caracteres extraños', 'error');

      }
  }
  }
}
