import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria';
import { ObjetoAprendizaje } from '../model/objetoAprendizaje';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { ObjetoAprendizajeService } from '../services/objeto-aprendizaje.service';
import Swal from 'sweetalert2';
import { ObjetoAprendizajeDTO } from '../DTOs/ObjetoAprendizajeDTO';
import { DataService } from '../services/data.service';
import { isUndefined } from 'util';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-objeto-aprendizaje',
  templateUrl: './objeto-aprendizaje.component.html',
  styleUrls: ['./objeto-aprendizaje.component.css']
})
/**
 * Componente encargado de crear los objetos de aprendizaje 
 */
export class ObjetoAprendizajeComponent implements OnInit{

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;
  public objetoAprendizaje: ObjetoAprendizaje = new ObjetoAprendizaje();
  usuario: User = new User();
  iscategoriasseleccionadas: boolean;
  editarOA: boolean;

  categorias: Categoria[];
  categoriasSeleccionadas: Categoria[];

  constructor(private categoriaService: CategoriaService,
              private objetoAprendizajeService: ObjetoAprendizajeService,
              private dataService: DataService,
              private router: Router,
              private userService: UserService) {}




  ngOnInit() {
    this.objetoAprendizaje.tituloOA = '';
    this.objetoAprendizaje.descripcion = '';
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

  /**
   * metodos para el select de categorias
   * @param item 
   */
  onItemSelect(item: any) {
    this.categoriasSeleccionadas.push(item);
    this.iscategoriasseleccionadas = false;
  }
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
///fin de metodos para categorias

/**
 * metodo para crear el objeto de aprendizaje 
 */
  crearOA(){

    if (this.objetoAprendizaje.tituloOA.length === 0
      || this.objetoAprendizaje.descripcion.length === 0){
        Swal.fire('Error al crear objeto ',`CAMPOS VACIOS!!`, 'error');
    }else if (this.categoriasSeleccionadas.length === 0){
      this.iscategoriasseleccionadas = true;
    }else{
    const estadoOA = 'INACTIVO';
    this.usuario.email = this.userService.user.email;
    this.objetoAprendizaje.propietario = this.userService.user;
    this.objetoAprendizaje.categorias = this.categoriasSeleccionadas;
    this.objetoAprendizaje.visitas = 0;
    this.objetoAprendizaje.estadoOA = estadoOA;
    this.objetoAprendizajeService.create(this.objetoAprendizaje).subscribe(
      json => {
        if ( json.data.idOA != null){
          Swal.fire('Nuevo Objeto-Aprendizaje', `Objeto ${json.data.tituloOA} creado con exito !`, 'success');
          this.dataService.objetoAprendizajeDTO = json.data;
          this.router.navigate(['/editarOA']);

        }

      }
    );
    }
  }
}
