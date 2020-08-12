import { Component, OnInit } from '@angular/core';

import { VisorService } from '../services/visor.service';
import { DataService } from '../services/data.service';

import { Pagina } from '../model/pagina';
import { Seccion } from '../model/seccion';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css'],
})
export class VisorComponent implements OnInit {
  categorias: String = "";
  seccionesCompletas : secciones[] = new Array;
  seleccionado: Seccion;
  selectPag: Pagina;
  iniciado: boolean;
  actividadSeleccionada: Pagina;

  constructor(private _visorService: VisorService,
              private dataService: DataService) { }

  ngOnInit(): void {
    if(this.visorService.obtenerOA() != null) {
      this.visorService.oa = this.visorService.obtenerOA();
    }
    for(let i = 0; i < this.visorService.oa.categorias.length; i++) {
      this.categorias = this.categorias + this.visorService.oa.categorias[i].nombre;
      if(i < this.visorService.oa.categorias.length - 1) {
        this.categorias = this.categorias + ", ";
      }
    }
    this.iniciado = false;
  }

  actividadesSecciones(): void {
    for (let i of this.visorService.oa.secciones) {
      let seccionAux: secciones = {
        seccion: i,
        paginas: this.dataService.traerListaPaginas(i.id)
      };
      this.seccionesCompletas.push(seccionAux);
    }
    this.iniciado = true;
  }

  seccionSeleccionada(item: Seccion) {
    this.seleccionado = (this.seleccionado === item ? null : item)
  }

  actividadSel(item: Pagina) {
    this.selectPag = (this.selectPag === item ? null : item)
    this.actividadSeleccionada = item;
    document.getElementById("contenido").innerHTML = this.actividadSeleccionada.contenidoPagina;
  }

  get visorService(): VisorService {
    return this._visorService;
  }
}

interface secciones {
  seccion: Seccion;
  paginas: Pagina[];
}
