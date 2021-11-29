import { SeccionService } from './../services/seccion.service';
import { Component, OnInit } from '@angular/core';
import { ObjetoAprendizaje } from '../model/objetoAprendizaje';
import { Categoria } from '../model/categoria';
import { CategoriaService } from '../services/categoria.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ObjetoAprendizajeDTO } from '../DTOs/ObjetoAprendizajeDTO';
import { DataService } from '../services/data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Seccion } from '../model/seccion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-objeto-aprendizaje',
  templateUrl: './editar-objeto-aprendizaje.component.html',
  styleUrls: ['./editar-objeto-aprendizaje.component.css']
})
/**
 * Componente que se encarga de editar el objeto aprendizaje 
 */
export class EditarObjetoAprendizajeComponent implements OnInit {

  myForm: FormGroup;
  dropdownList = [];
  dropdownSettings: IDropdownSettings;
  objetoAprendizajeDTO: ObjetoAprendizajeDTO;

  public objetoAprendizaje: ObjetoAprendizaje = new ObjetoAprendizaje();
  categoriasSeleccionadas: Categoria[];
  categorias: Categoria;
  crearSeccionesOA: boolean;
  iscategoriasseleccionadas: boolean;

  constructor(private categoriaService: CategoriaService,
              private dataService: DataService,
              private fb: FormBuilder,
              private router: Router,
              private seccionService:SeccionService) { }

  ngOnInit(): void {
    this.objetoAprendizajeDTO = this.dataService.objetoAprendizajeDTO;
    this.objetoAprendizajeDTO.secciones = this.dataService.traerListaSecciones(this.dataService.objetoAprendizajeDTO.idOA);
    this.objetoAprendizajeDTO.secciones = this.dataService.objetoAprendizajeDTO.secciones === undefined ? []:this.dataService.objetoAprendizajeDTO.secciones;
  //  this.objetoAprendizajeDTO.secciones = [{id: 1, nombreSeccion: 'seccion 1', descripcion: 'dasda', posInOA: 1, objetoAprendizaje: 1}, {id: 1, nombreSeccion: 'seccion2', descripcion: 'dasda', posInOA: 1, objetoAprendizaje: 1}];
    this.categoriasSeleccionadas = this.dataService.objetoAprendizajeDTO.categorias;
    this.categoriaService.getCategorias().subscribe(

     json => {
        this.categorias = json.data;
      }

    )
    // configuraciones para el desplegable de categorias
    this.dropdownSettings ={
      singleSelection: false,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.myForm = this.fb.group({
      categorias: [this.categoriasSeleccionadas]
  });
  }

  /**
   * seleccion items categorias
   * @param item 
   */
  onItemSelect(item: any) {
    this.categoriasSeleccionadas.push(item);
    this.iscategoriasseleccionadas = false;
  }
  /**
   * seleccion todos los items de las categorias
   * @param items 
   */
  onSelectAll(items: Categoria[]){
    this.categoriasSeleccionadas = items;
    this.iscategoriasseleccionadas = false;

  }

  onItemDeSelect(item: Categoria){
    for( let i = 0; i < this.categoriasSeleccionadas.length; i++ ){
      if(this.categoriasSeleccionadas[i].nombre === item.nombre){
        this.categoriasSeleccionadas.splice(i);
      }
    }

  }
  /**
   * se encarga de enviar a la seccion, a su editar 
   * @param idSeccion 
   */
  editarSeccion(idSeccion: number){
    this.seccionService.buscarSeccionPorId(idSeccion).subscribe( json => {
      if(json.data != null){
        this.dataService.seccionDTO = json.data;
        this.router.navigate(['/editarSeccion']);
      }

    });

  }

}
