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
export class EditarSeccionComponent implements OnInit {

  public seccionDTO: SeccionDTO = new SeccionDTO();
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.seccionDTO = this.dataService.seccionDTO;
    this.seccionDTO.paginas = this.dataService.traerListaPaginas(this.seccionDTO.idSeccion);
  }

}