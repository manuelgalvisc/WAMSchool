import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  listaActividades : Array<String>;
  mostrarAlerta : boolean;
  ocultarSelect : boolean;
  mostrarBtnCancelar;
  constructor(private router: Router) {

    this.listaActividades = new Array<String>();
    this.listaActividades.push("----------------------------");
    this.listaActividades.push("Actividad Tipo Cuestionario");
    this.listaActividades.push("Actividad Tipo Juego Ahorcado");
    this.listaActividades.push("Actividad Tipo Emparejar Listas");
    this.mostrarAlerta = false;
    this.ocultarSelect = false;
    this.mostrarBtnCancelar =false;
  }

  ngOnInit(): void {
  }

  seleccionActividad(tipoActividad : string){
    if(tipoActividad === this.listaActividades[0]){
      this.mostrarAlerta = true;
    }else{
      this.mostrarAlerta = false;
      this.ocultarSelect = true;
      this.mostrarBtnCancelar = true;
      if(tipoActividad === this.listaActividades[1]){
        this.router.navigate([{outlets:{routeract:'cuestionario'}}]);
      }
    }
    if(tipoActividad === this.listaActividades[1]){
      this.router.navigate(['/crearActividad/1']);
    }
    if(tipoActividad === this.listaActividades[2]){
      this.router.navigate(['/crearActividad/2']);
    }


  }

  desactivarBtnCancelar(){

    this.router.navigate(['/crearActividad']);
    this.mostrarBtnCancelar = false;
    this.ocultarSelect = false;
  }

}
