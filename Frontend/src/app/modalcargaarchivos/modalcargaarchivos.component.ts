import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import { ArchivoService } from '../services/archivo.service';

@Component({
  selector: 'app-modalcargaarchivos',
  templateUrl: './modalcargaarchivos.component.html',
  styleUrls: ['./modalcargaarchivos.component.css']
})
export class ModalcargaarchivosComponent implements OnInit {


  Archivo: File;
  listaArchivos: Array<File>;
  tamañoMaximo: number = 10485760;
  advertenciaTamaño: boolean;
  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private dataService: DataService,
              public archivoService: ArchivoService ) {

  }


  ngOnInit(): void {
    this.advertenciaTamaño = false;
  }

  public subirArchivo(event): void{
      this.Archivo = event.target.files[0];
      if(this.Archivo.size >= this.tamañoMaximo){
        Swal.fire('Advertencia',`Archivo:  ${this.Archivo.name} demasiado pesado no se cargará`, 'error');
      }else{
        this.archivoService.listaArchivos.push(this.Archivo);
      }
  }

}
