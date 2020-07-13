import { Component, OnInit,AfterViewInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria';
import { ObjetoAprendizaje } from '../model/objetoAprendizaje';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-objeto-aprendizaje',
  templateUrl: './objeto-aprendizaje.component.html',
  styleUrls: ['./objeto-aprendizaje.component.css']
})
export class ObjetoAprendizajeComponent implements OnInit{

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;
  public objetoAprendizaje: ObjetoAprendizaje = new ObjetoAprendizaje();

  constructor(private categoriaService: CategoriaService,
              private activatedRoute: ActivatedRoute) {}
  categorias: Categoria[];


  ngOnInit() {

    this.categoriaService.getCategorias().subscribe(

     json => {
        this.categorias = json.data;
        console.log(json.data);
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

  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  crearOA(){
    console.log(this.objetoAprendizaje);
  }
}
