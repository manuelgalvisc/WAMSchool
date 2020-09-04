import { Component, OnInit } from '@angular/core';

import { VisorService } from '../services/visor.service';
import { DataService } from '../services/data.service';
import { EnlaceService } from '../services/enlace.service';

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
  contenidoBool: boolean = false;
  tienePDF: boolean = false;
  videoBool: boolean = false;
  auxArchivos: boolean = false;
  enlacesVideos: String[];
  videoInicial: String;

  constructor(private _visorService: VisorService,
              private dataService: DataService,
              private enlaceService: EnlaceService) { }

  ngOnInit() {
    if(this.visorService.obtenerOA() != null) {
      this.visorService.oa = this.visorService.obtenerOA();
      this.guardarSeccionesOA();
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
    this.enlacesVideos = new Array();
  }

  guardarSeccionesOA() {
    if(this.visorService.oa.secciones.length == 0) {
      let idOA = [this.visorService.oa.idOA];
      this.visorService.traerSecciones(idOA).subscribe(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.visorService.oa.secciones.push({
            id: response.data[i].idSeccion,
            objetoAprendizaje: response.data[i].idOA,
            posInOA: response.data[i].posInOA,
            descripcion: response.data[i].descripcion,
            nombreSeccion: response.data[i].nombreSeccion
          });
        }
        this.visorService.guardarOA(this.visorService.oa);
      }, error => {
        console.log(error);
      });
    }
  }

  actividadesSecciones(): void {
    if(this.seccionesCompletas.length==0) {
      for (let i of this.visorService.oa.secciones) {
        let seccionAux: secciones = {
          seccion: i,
          paginas: this.dataService.traerListaPaginas(i.id)
        };
        this.seccionesCompletas.push(seccionAux);
      }
      this.iniciado = true;
    }
  }

  cargarVideos() {
    this.videoBool = (this.videoBool == false ? true : false);
    if(this.seleccionado != undefined) {
      if(this.actividadSeleccionada != undefined) {
        let idPagina = [this.actividadSeleccionada.id];
        this.enlaceService.listarEnlaces(idPagina).subscribe((response: { data: string | any[]; }) => {
          console.log(response);
          let url = "https://www.youtube.com/embed/";
          this.videoInicial = url.concat(response.data[0].url);
          for (let i = 1; i < response.data.length; i++) {
            this.enlacesVideos.push(url.concat(response.data[i].url));
          }
          console.log(this.enlaceService);
        });
      }
    }
  }

  seccionSeleccionada(item: Seccion) {
    this.seleccionado = (this.seleccionado === item ? null : item);
  }

  //Cargar contenido
  cargarContenido() {
    let div: HTMLElement;
    this.contenidoBool = (this.contenidoBool == false ? true : false);
    if(this.selectPag != undefined) {
      if(this.contenidoBool == true) {
        if(this.actividadSeleccionada != undefined) {
          div = document.getElementById("contenido");
          div.innerHTML = this.actividadSeleccionada.contenidoPagina;
        } else {
          div = document.getElementById("contenido");
          div.innerHTML = "<div>El usuario no ha subido contenido a esta página</div>";
        }
      } else {
        document.getElementById("contenido").innerHTML = "";
      }
    }
  }

  cargarArchivos() {
    this.tienePDF = (this.tienePDF == false ? true : false);
    if(this.pdfSrc == undefined) {
      this.auxArchivos = false;
    } else {
      this.auxArchivos = true;
    }
  }

  //Seleccion de actividad
  actividadSel(item: Pagina) {
    this.selectPag = (this.selectPag === item ? null : item)
    this.actividadSeleccionada = item;
    this.obtenerArchivos(item.id);
  }

  obtenerArchivos(item: number) {
    var listaPaginas: Array<ArchivoDTO> = new Array;
    this.visorService.obtenerArchivos(item).subscribe(
      json =>{
        if(json.data != null){
          listaPaginas = json.data;
          listaPaginas.map((y) => {
            let archivo: ArchivoDTO = new ArchivoDTO();
            archivo.nombre = y.nombre;
            this.listaArchivos.push(archivo);
            console.log(archivo.nombre);
            this.pdfSrc = "http://localhost:9000/api/archivo/Archivos/"+archivo.nombre;
          });
        }
      });
  }

  get visorService(): VisorService {
    return this._visorService;
  }
}

interface secciones {
  seccion: Seccion;
  paginas: Pagina[];
}
