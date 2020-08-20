import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {

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
  constructor() {
    this.palabraOculta = "_ ".repeat(this.palabra.length);
  }

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

  existeLetra(letra) {
    if (this.palabra.indexOf(letra) >= 0) {
      //console.log("La letra existe" + letra);
    } else {
      this.intentos++;
    }

  }

  guardarPalabra(){
      if(this.pattern.test(this.palabraGuardar)){
        this.palabra = this.palabraGuardar;
        this.palabraOculta = "_ ".repeat(this.palabra.length);
      }else{
        alert(this.palabraGuardar)
      }
  }

}
