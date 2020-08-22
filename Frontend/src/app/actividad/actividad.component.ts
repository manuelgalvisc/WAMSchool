import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  constructor( private router:Router) { 
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
  }

  desactivarBtnCancelar(){
    this.ocultarSelect = false;
    this.mostrarBtnCancelar = false;
    this.router.navigate(['/crearActividades']);

  }

}
