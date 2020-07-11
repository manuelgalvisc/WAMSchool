import { Component, OnInit,AfterViewInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria';


@Component({
  selector: 'app-objeto-aprendizaje',
  templateUrl: './objeto-aprendizaje.component.html',
  styleUrls: ['./objeto-aprendizaje.component.css']
})
export class ObjetoAprendizajeComponent implements OnInit, AfterViewInit{





  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  constructor(private categoriaService: CategoriaService) {}
  categorias: Categoria[];

  ngAfterViewInit(): void {




    /*
    this.dropdownList = [
      { id: 1, nombre: 'Mumbai' },
      { id: 2, nombre: 'Bangaluru' },
      { id: 3, nombre: 'Pune' },
      { id: 4, nombre: 'Navsari' },
      { id: 5, nombre: 'New Delhi' }
    ];*/

  }

  ngOnInit() {

    this.categoriaService.getCategorias().subscribe(
      categorias => this.categorias = categorias
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

  }

  }








