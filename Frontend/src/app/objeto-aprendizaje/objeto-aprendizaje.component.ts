import { Component, OnInit,AfterViewInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria';
import { ObjetoAprendizaje } from '../model/objetoAprendizaje';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { ObjetoAprendizajeService } from '../services/objeto-aprendizaje.service';
import Swal from 'sweetalert2';


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
  usuario: User = new User();

  categorias: Categoria[];
  categoriasSeleccionadas: Categoria[];

  constructor(private categoriaService: CategoriaService,
              private activatedRoute: ActivatedRoute,
              private objetoAprendizajeService: ObjetoAprendizajeService ) {}




  ngOnInit() {
    this.categoriasSeleccionadas = [];
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

  }
  onItemSelect(item: any) {
    this.categoriasSeleccionadas.push(item);
  }
  onSelectAll(items: Categoria[]){
    this.categoriasSeleccionadas = items;
  }

  onItemDeSelect(item: Categoria){
    for( let i = 0; i < this.categoriasSeleccionadas.length; i++ ){
      if(this.categoriasSeleccionadas[i].nombre === item.nombre){
        this.categoriasSeleccionadas.splice(i);
      }
    }


  }


  crearOA(){
    const estadoOA = 'INACTIVO';
    this.usuario.email = 'haig@nopo.com';
    this.objetoAprendizaje.propietario = this.usuario;
    this.objetoAprendizaje.categorias = this.categoriasSeleccionadas;
    this.objetoAprendizaje.visitas = 0;
    this.objetoAprendizaje.estadoOA = estadoOA;
    this.objetoAprendizajeService.create(this.objetoAprendizaje).subscribe(
      json =>{
        if ( json.data.idOA != null){
          Swal.fire('Nuevo Objeto-Apendizaje', `Objeto ${json.data.tituloOA} creado con exito !`, 'success');
        }

      }
    );
  }
}
