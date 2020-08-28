import { Component, OnInit } from '@angular/core';
import { Seccion } from '../model/seccion';
import { DataService } from '../services/data.service';
import { SeccionService } from '../services/seccion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
/**
 * componente encargado de crear las secciones 
 */
export class SeccionComponent implements OnInit {

  public seccion: Seccion = new Seccion();
  private idOA: number;

  constructor(public dataService: DataService,
              private seccionService: SeccionService,
              private router: Router) { }

  ngOnInit(): void {
    this.seccion.descripcion = '';
    this.seccion.nombreSeccion = '';
  }

  /**
   * metodo encargado de crear la seccion , se validan los campos 
   */
  crearSeccion(): void{
    if (this.seccion.nombreSeccion.length === 0
      || this.seccion.descripcion.length === 0){
        Swal.fire('Error al crear la sección ', `CAMPOS VACIOS!!`, 'error');
    }else if (this.dataService.objetoAprendizajeDTO === undefined){
      Swal.fire('Error al crear la sección ', `SECCION NO RELACIONADA CON OBJETO DE APRENDIZAJE!!`, 'error');
    }else{
    this.idOA = this.dataService.objetoAprendizajeDTO.idOA;
    this.seccionService.crearSeccion(this.seccion, this.idOA).subscribe(
      json => {
        if ( json.data != null){
          Swal.fire('Nueva Seccion ', ` ${json.data.nombreSeccion} creada con exito !`, 'success');
          this.dataService.seccionDTO = json.data;
          this.router.navigate(['/editarSeccion']);
        }

      }
    )


  }
}
}
