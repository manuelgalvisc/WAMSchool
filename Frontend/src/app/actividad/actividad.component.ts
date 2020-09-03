import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
/**
 * Componente encargado de soportar el item de crear actividad
 */
export class ActividadComponent implements OnInit {

  listaActividades : Array<String>;
  mostrarAlerta : boolean;
  ocultarSelect : boolean;
  mostrarBtnCancelar;
  constructor(private router: Router,
              public dataService: DataService) {

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
    this.mostrarBtnCancelar = false;
    this.ocultarSelect = false;
  }

  /**
   * metodo que se encarga de enrutar al componente que va a crear la actividad, solicita la
   * descripción de la actividad
   * @param tipoActividad
   */
  seleccionActividad(tipoActividad : string){
    if(tipoActividad === this.listaActividades[0]){
      this.mostrarAlerta = true;
    }else{
      this.mostrarAlerta = false;
      this.ocultarSelect = true;
      this.mostrarBtnCancelar = true;
    }
    if(tipoActividad === this.listaActividades[1]){
      this.router.navigate(['/crearActividad/1']);
    }
    if(tipoActividad === this.listaActividades[2]){
      this.router.navigate(['/crearActividad/2']);
    }
    if(tipoActividad === this.listaActividades[3]){
      this.router.navigate(['/crearActividad/3']);
    }


  }

  /**
   * Accion del boton cancelar
   */
  desactivarBtnCancelar(){

    this.router.navigate(['/crearActividad']);
    this.mostrarBtnCancelar = false;
    this.ocultarSelect = false;
  }

}
