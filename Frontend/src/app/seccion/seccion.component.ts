import { Component, OnInit } from '@angular/core';
import { Seccion } from '../model/seccion';
import { DataService } from '../services/data.service';
import { SeccionService } from '../services/seccion.service';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent implements OnInit {

  public seccion: Seccion = new Seccion();
  private idOA: number;
  constructor(private dataService: DataService,
              private seccionService: SeccionService) { }

  ngOnInit(): void {

  }

  crearSeccion(): void{
    this.idOA = this.dataService.objetoAprendizajeDTO.idOA;
    this.seccionService.crearSeccion(this.seccion, this.idOA).subscribe(
      json =>{
        console.log(json.data);
      }
    )


  }
}
