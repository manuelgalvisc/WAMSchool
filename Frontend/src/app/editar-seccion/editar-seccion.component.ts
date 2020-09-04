import { ActividadService } from './../services/actividad.service';
import { PaginaService } from './../services/pagina.service';
import { SeccionDTO } from './../DTOs/SeccionDTO';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Seccion } from '../model/seccion';

@Component({
  selector: 'app-editar-seccion',
  templateUrl: './editar-seccion.component.html',
  styleUrls: ['./editar-seccion.component.css']
})
/**
 * componente encargado de edita la seccion ya creada
 */
export class EditarSeccionComponent implements OnInit {

  actividades: any = new Array<any>();
  actividadesNombre: any = new Array<any>();
  public seccionDTO: SeccionDTO = new SeccionDTO();
  constructor(public dataService: DataService,
              private actividadesServices: ActividadService) { }

  ngOnInit(): void {
    this.seccionDTO = this.dataService.seccionDTO;
    this.seccionDTO.paginas = this.dataService.traerListaPaginas(this.seccionDTO.idSeccion);
    this.actividades = this.listarActividades(this.seccionDTO.idSeccion);
    console.log(this.actividades);
  }

  listarActividades(seccion : number):any[]{

    var listaActividades : any[] = new Array();
    this.actividadesServices.consultarCuestionarioPorSeccion(seccion).subscribe(
      (res)=>{
        for (const iterator of res.data) {

          listaActividades.push(iterator.introduccion);
        }
        this.actividadesServices.consultarActividadEmparejamientoPorSeccion(seccion).subscribe(
          (res)=>{
            for (const iterator of res.data) {
              listaActividades.push(iterator.enunciado);
            }
            this.actividadesServices.listarAhorcados(seccion).subscribe(
              (res)=>{
                for (const iterator of res.data) {
                  listaActividades.push(iterator.indicio);
                }
              }
            );
          }
        );
      }
    );
    return listaActividades;
  }


}
