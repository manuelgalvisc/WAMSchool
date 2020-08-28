import { Component, OnInit } from '@angular/core';
import { Pagina } from '../model/pagina';
import { PaginaService } from '../services/pagina.service';
import Swal from 'sweetalert2';
import { Enlace } from '../model/enlace';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalenlacesvideosComponent } from '../modalenlacesvideos/modalenlacesvideos.component';
import { ComponenteyoutubeComponent } from '../componenteyoutube/componenteyoutube.component';
import { ModalcargaarchivosComponent } from '../modalcargaarchivos/modalcargaarchivos.component';
import { DataService } from '../services/data.service';
import { ArchivoService } from '../services/archivo.service';

@Component({
  selector: 'app-crearpagina',
  templateUrl: './crearpagina.component.html',
  styleUrls: ['./crearpagina.component.css']
})
/**
 * Componente para crear las paginas
 */
export class CrearpaginaComponent implements OnInit {

  pagina: Pagina;
  texto: string;
  mostrarContenido: boolean;
  listaVideos : Array<Enlace>;

  constructor(private paginaService: PaginaService,
              private modalService: NgbModal,
              public dataService: DataService,
              private archivoService: ArchivoService) { }

  ngOnInit(): void {
    this.pagina = new Pagina();
    this.pagina.nombrePagina = "";
    this.pagina.tipo = 0;
    this.texto = ""
    this.mostrarContenido = false;
    this.listaVideos = new Array<Enlace>();
  }

  /**
   * se encarga de cambiar el contenido cada vez que registra un cambio en el texto
   * @param $event 
   */
  cargaContenido($event) {
    //console.log($event);
    this.texto = $event;
  }

  /**
   * muestra el contenido 
   */
  mostrarConte() {
    this.mostrarContenido = this.mostrarContenido === false ? true : false;
  }

  /**
   * muestra el modal donde se reproducen los videos  
   */
  mostrarModal() {
    const modalRef = this.modalService.open(ModalenlacesvideosComponent);
    modalRef.result.then((r)=>{
      this.listaVideos.push(r);
    });
  }

  /**
   * crea la pagina y valida que tenga nombre 
   */
  crearPagina() {
    if (this.pagina.nombrePagina.length > 0) {
      this.pagina.contenidoPagina = this.texto;
      this.pagina.enlaces = this.listaVideos;
      this.paginaService.crearPagina(this.pagina,this.dataService.seccionDTO.idSeccion).subscribe(
        json => {
          if (json.data != null) {
            Swal.fire('Nueva pagina ', ` ${json.data.nombrePagina} creada con exito !`, 'success');
            this.guardarArchivo(json.data.idPagina);
          }
        }
      );
    }
  }

  /**
   * metodo encargado de guardar los archivos en el servidor
   * @param idPagina 
   */
  guardarArchivo(idPagina: number): void{
    if(this.archivoService.listaArchivos != null){
      for(let i = 0; i<this.archivoService.listaArchivos.length; i++){
        this.archivoService.subirArchivo(this.archivoService.listaArchivos[i], idPagina).subscribe(
          json => {
            if(json.data !=null){
              this.dataService.Archivo = null;
            }
          }
        )
      }
      this.archivoService.listaArchivos = new Array<File>();
      }

  }

  /**
   * metodo que se encarga de abril el modal que crea los enlaces de youtube
   * @param enlace 
   */
  abrilModalYOUTUBE(enlace: Enlace){
    const modalRef = this.modalService.open(ComponenteyoutubeComponent);
    modalRef.componentInstance.enlace = enlace;
  }

  /**
   * metodo que se encarga de abrir el modal donde se carga los archivos
   */
  abrilModalCargaArchivo(){
    const modalRef = this.modalService.open(ModalcargaarchivosComponent);
  }
  /**
   * metodo que se encarga de eliminar los enlaces
   * @param identificador 
   */
  eliminarEnlace(identificador : number){
    console.log(identificador);
    this.listaVideos.splice(identificador,1);
  }



}
