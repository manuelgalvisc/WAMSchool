import { Component, OnInit } from '@angular/core';
import { Pagina } from '../model/pagina';
import { PaginaService } from '../services/pagina.service';
import Swal from 'sweetalert2';
import { Enlace } from '../model/enlace';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalenlacesvideosComponent } from '../modalenlacesvideos/modalenlacesvideos.component';
import { ComponenteyoutubeComponent } from '../componenteyoutube/componenteyoutube.component';
import { ModalcargaarchivosComponent } from '../modalcargaarchivos/modalcargaarchivos.component';

@Component({
  selector: 'app-crearpagina',
  templateUrl: './crearpagina.component.html',
  styleUrls: ['./crearpagina.component.css']
})
export class CrearpaginaComponent implements OnInit {

  pagina: Pagina;
  texto: string;
  mostrarContenido: boolean;
  listaVideos : Array<Enlace>;

  constructor(private paginaService: PaginaService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pagina = new Pagina();
    this.pagina.nombrePagina = "";
    this.pagina.tipo = 0;
    this.texto = ""
    this.mostrarContenido = false;
    this.listaVideos = new Array<Enlace>();
  }

  cargaContenido($event) {
    console.log($event);
    this.texto = $event;
  }

  mostrarConte() {
    this.mostrarContenido = this.mostrarContenido === false ? true : false;
  }

  mostrarModal() {
    const modalRef = this.modalService.open(ModalenlacesvideosComponent);
    modalRef.result.then((r)=>{
      this.listaVideos.push(r);
    });
  }

  crearPagina() {
    if (this.pagina.nombrePagina.length > 0) {
      this.pagina.contenidoPagina = this.texto;
      this.pagina.enlaces = this.listaVideos;
      this.paginaService.crearSeccion(this.pagina,1).subscribe(
        json => {
          if (json.data != null) {
            Swal.fire('Nueva pagina ', ` ${json.data.nombrePagina} creada con exito !`, 'success');

          }
        }
      );
    }
  }

  abrilModalYOUTUBE(enlace:Enlace){
    const modalRef = this.modalService.open(ComponenteyoutubeComponent);
    modalRef.componentInstance.enlace = enlace;
  }

  abrilModalCargaArchivo(){
    const modalRef = this.modalService.open(ModalcargaarchivosComponent);
  }
  eliminarEnlace(identificador : number){
    console.log(identificador);
    this.listaVideos.splice(identificador,1);
  }



}
