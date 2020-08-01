import { Component, OnInit } from '@angular/core';
import { Pagina } from '../model/pagina';
import { PaginaService } from '../services/pagina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crearpagina',
  templateUrl: './crearpagina.component.html',
  styleUrls: ['./crearpagina.component.css']
})
export class CrearpaginaComponent implements OnInit {

  pagina: Pagina;
  texto: string;
  mostrarContenido: boolean;
  listaVideos : Array<string>;

  constructor(private paginaService: PaginaService) { }

  ngOnInit(): void {
    this.pagina = new Pagina();
    this.pagina.nombrePagina = "";
    this.pagina.tipo = 0;
    this.texto = ""
    this.mostrarContenido = false;
    this.listaVideos = new Array<string>();
  }

  cargaContenido($event) {
    console.log($event);
    this.texto = $event;
  }

  mostrarConte() {
    this.mostrarContenido = this.mostrarContenido === false ? true : false;
  }

  crearPagina() {
    if (this.pagina.nombrePagina.length > 0) {
      this.pagina.contenidoPagina = this.texto;
      this.paginaService.crearSeccion(this.pagina,1).subscribe(
        json => {
          if (json.data != null) {
            Swal.fire('Nueva pagina ', ` ${json.data.nombrePagina} creada con exito !`, 'success');

          }
        }
      );
    }


  }



}
