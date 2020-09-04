import { Component, OnInit } from '@angular/core';

import { VisorService } from '../services/visor.service';
import { DataService } from '../services/data.service';
import { EnlaceService } from '../services/enlace.service';

import { Pagina } from '../model/pagina';
import { Seccion } from '../model/seccion';
import { ArchivoDTO } from '../DTOs/ArchivoDTO';
import { ActividadCuestionario } from '../model/actividadCuestionario';
import { ActividadService } from '../services/actividad.service';
import { ActividadEmparejamiento } from '../model/actividadEmparejamiento';

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
  enlacesVideos: String[];
  videoInicial: String;
  listaReferenciasActividades : number[];

  constructor(private _visorService: VisorService,
              private dataService: DataService,
              private enlaceService: EnlaceService,
              private actividadesServices : ActividadService) { }

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
    this.listaReferenciasActividades = new Array();
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
          paginas: this.dataService.traerListaPaginas(i.id),
          actividades:  this.listarActividades(i.id),
        };
        this.seccionesCompletas.push(seccionAux);
      }
      this.iniciado = true;
    }
  }


  listarActividades(seccion : number):any[]{

    var listaActividades : any[] = new Array();
    this.listaReferenciasActividades = new Array();
    this.actividadesServices.consultarCuestionarioPorSeccion(seccion).subscribe(
      (res)=>{
        for (const iterator of res.data) {
          listaActividades.push(iterator);
          this.listaReferenciasActividades.push(1);
        }
        this.actividadesServices.consultarActividadEmparejamientoPorSeccion(seccion).subscribe(
          (res)=>{
            for (const iterator of res.data) {
              listaActividades.push(iterator);
              this.listaReferenciasActividades.push(2);
            }
          }
        );
      }
    );
    return listaActividades;
  }

  cargarVideos() {
    this.videoBool = (this.videoBool == false ? true : false);
    if(this.actividadSeleccionada != undefined) {
      let idPagina = [this.actividadSeleccionada.id];
      this.enlaceService.listarEnlaces(idPagina).subscribe((response: { data: string | any[]; }) => {
        let url = "https://www.youtube.com/embed/";
        this.videoInicial = url.concat(response.data[0].url);
        for (let i = 1; i < response.data.length; i++) {
          this.enlacesVideos.push(url.concat(response.data[i].url));
        }
      });
    }
  }

  seccionSeleccionada(item: Seccion) {
    this.seleccionado = (this.seleccionado === item ? null : item);
  }

  //Seleccion de actividad
  actividadSel(item: Pagina) {
    this.selectPag = (this.selectPag === item ? null : item)
    this.actividadSeleccionada = item;
    document.getElementById("contenido").innerHTML = this.actividadSeleccionada.contenidoPagina;
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

  nombreActividad(actividad : any):string{
    if(actividad.introduccion != null){
      return actividad.introduccion;
    }else if(actividad.enunciado != null){
      return actividad.enunciado;
    }
    return "defecto";
  }
}

interface secciones {
  seccion: Seccion;
  paginas: Pagina[];
  actividades:any[];

}
