import { Component, OnInit } from '@angular/core';

import { VisorService } from '../services/visor.service';
import { DataService } from '../services/data.service';

import { Pagina } from '../model/pagina';
import { Seccion } from '../model/seccion';
import { ArchivoDTO } from '../DTOs/ArchivoDTO';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css'],
})
export class VisorComponent implements OnInit {
  categorias: String = "";
  seccionesCompletas : secciones[];
  seleccionado: Seccion;
  selectPag: Pagina;
  iniciado: boolean;
  actividadSeleccionada: Pagina;
  pdfSrc: string;
  listaArchivos: ArchivoDTO[];

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
    this.listaArchivos = new Array<ArchivoDTO>();
    this.seccionesCompletas = new Array();
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
    this.listaArchivos = this.visorService.convertirADTO(item.id);
    this.selectPag = (this.selectPag === item ? null : item)
    this.actividadSeleccionada = item;
    document.getElementById("contenido").innerHTML = this.actividadSeleccionada.contenidoPagina;
    console.log(this.listaArchivos[0]);
  }

  get visorService(): VisorService {
    return this._visorService;
  }
}

interface secciones {
  seccion: Seccion;
  paginas: Pagina[];
}
