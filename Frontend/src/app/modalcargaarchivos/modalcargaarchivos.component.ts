import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modalcargaarchivos',
  templateUrl: './modalcargaarchivos.component.html',
  styleUrls: ['./modalcargaarchivos.component.css']
})
export class ModalcargaarchivosComponent implements OnInit {


  Archivo: File;
  tamañoMaximo: number = 10485760;
  advertenciaTamaño: boolean;
  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private dataService: DataService) {

  }


  ngOnInit(): void {
    this.advertenciaTamaño = false;
  }

  public subirArchivo(event): void{
    this.Archivo = event.target.files[0];
    if(this.Archivo.size >= this.tamañoMaximo){
      Swal.fire('Advertencia',`Debe seleccionaro otro archivo`,'error');
    }else{
      this.dataService.Archivo = this.Archivo;
    }
  }

}
