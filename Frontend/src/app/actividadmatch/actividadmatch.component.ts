import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ParejaItem } from '../model/parejaItem';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalemparejamientoComponent} from '../modalemparejamiento/modalemparejamiento.component'; 
import { ActividadService } from '../services/actividad.service';
import { DataService } from '../services/data.service';
import {ActividadEmparejamiento} from '../model/actividadEmparejamiento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividadmatch',
  templateUrl: './actividadmatch.component.html',
  styleUrls: ['./actividadmatch.component.css']
})
/**
 * Componente que se encarga de crear la actividad de emparejamiento
 */
export class ActividadmatchComponent implements OnInit {

  parejas :ParejaItem[];
  introduccion:string;

  vamps = [
  ];

  vamps2 = [
  ];

  mssError : string;

  constructor(private dragulaService: DragulaService, private ngbModal:NgbModal,
    private actividadService:ActividadService,private dataService:DataService) {

    this.dragulaService.createGroup("VAMPIRES", {

    });

    this.dragulaService.dropModel("VAMPIRES").subscribe(args => {
      console.log(args);
    });
  }

  ngOnInit(): void {
    this.parejas = new Array<ParejaItem>();
    this.vamps = new Array();
    this.vamps2 = new Array();
    this.mssError = "";
    this.introduccion = "";
  }

  /**
   * metodo que se encarga una pareja con dos cadenas
   */
  AgregarPareja() {
    this.ngbModal.open(ModalemparejamientoComponent).result.then(
      (r)=>{
        if(r.cadena1 != null && r.cadena2 != null){
          this.parejas.push(r);
          this.vamps.push({name : r.cadena1});
          this.vamps2.push({name:r.cadena2});
        }
      }
    );
  }

  /**
   * metodo crear, realiza las validaciones de que no se halla desagrupado las columnas y que halla
   * una introducción y una pareja 
   */
  crear(){
    if(this.parejas.length > 0 && this.vamps.length === this.vamps2.length && this.introduccion.length > 0){
      let actividad : ActividadEmparejamiento = new ActividadEmparejamiento();
      actividad.parejas = this.parejas;
      actividad.enunciado = this.introduccion;
      this.actividadService.crearEmparejamiento(actividad,this.dataService.seccionDTO.idSeccion).subscribe((json) => {
        if ( json.data != null){
          Swal.fire('Nueva actividad', `creada con exito !`, 'success');
          console.log(json.data);
        }
      });
    }else{
      this.mssError = "Se ha presentado un error, verifique que no hallan columnas con mas items que otras, o que la introducción no se encuentre vacía."
    }
  };

}
