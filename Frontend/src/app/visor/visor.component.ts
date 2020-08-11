import { Component, OnInit } from '@angular/core';

import { VisorService } from '../services/visor.service';

import { Seccion } from '../model/seccion';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css']
})
export class VisorComponent implements OnInit {
  titulo: String;
  autor: String;
  categorias: String = "";
  secciones = Array<Seccion>();
  mostrarActividad: boolean;

  constructor(private _visorService: VisorService) { }

  ngOnInit(): void {
    this.titulo = this.visorService.oa.tituloOA;
    this.autor = this.visorService.oa.nombreCompletoPropietario;
    for(let i = 0; i < this.visorService.oa.categorias.length; i++) {
      this.categorias = this.categorias + this.visorService.oa.categorias[i].nombre;
      if(i < this.visorService.oa.categorias.length - 1) {
        this.categorias = this.categorias + ", ";
      }
    }
    this.secciones = this.visorService.oa.secciones;
    this.mostrarActividad = false;
  }

  mostrarActividades(): void {
    if(!this.mostrarActividad) {
      this.mostrarActividad = true;
    } else {
      this.mostrarActividad = false;
    }
  }

  get visorService(): VisorService {
    return this._visorService;
  }
}
