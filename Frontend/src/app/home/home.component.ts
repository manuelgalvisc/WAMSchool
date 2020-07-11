import { Component, OnInit } from '@angular/core';
import { ObjetoAprendizajeDTO } from '../DTOs/ObjetoAprendizajeDTO';
import { ObjetoAprendizaje } from '../model/objetoAprendizaje';
import { ConsultasService } from '../services/consultas.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /// categorias
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;
  categorias: Categoria[];
  borrarCategoria: number;
  // busqueda por categorias
  categoriasFiltro: Categoria[];
  //page
  pagina: number = 0;
  numeroPagina: number = 0;
  primeraPaginacion: boolean = true;
  listaPaginas: Array<number> = [];
  busquedaPorCategorias: boolean = false;
  ////
  focus: boolean;
  listaObjetoAprendizajeDTO: ObjetoAprendizajeDTO[] = [];

  //search
  textConsulta : string = "";
  constructor(private consultasService: ConsultasService,
              private categoriaService: CategoriaService
              ) { }

  ngOnInit(): void {
    this.focus = false;
    this.categoriasFiltro = [];
    this.consultasService.listasOApag(this.numeroPagina).subscribe(
      json => {
        if (json.data == null && json.page == null) {
          console.log(json.mensaje);
        } else {
          this.listaObjetoAprendizajeDTO = json.data;
          this.numeroPagina = json.page.numeroPaginas;
          this.pagina = json.page.numeroPagina;
          this.listarPagina();
          console.log(json.data);
          console.log(json.page);
        }
      }
    );

    this.categoriaService.getCategorias().subscribe(

      json => {
        this.categorias = json.data;
        console.log(json.data);
      }

    )
    // configuraciones para el desplegable de categorias
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  /**
   * Este método solo se usa cuando hay pag y es mayor a una pagina de lo contrario no
   * @param pagina
   */
  public traerPaginacion(pagina: number): void {
    this.numeroPagina = pagina - 1;
    this.listaObjetoAprendizajeDTO = [];
    this.limpiarLista();
    if (this.primeraPaginacion) {
      console.log(this.numeroPagina);
      this.consultasService.listasOApag(this.numeroPagina).subscribe(
        json => {
          if (json.data == null && json.page == null) {
          } else {
            this.listaObjetoAprendizajeDTO = json.data;
            this.numeroPagina = json.page.numeroPaginas;
            this.pagina = json.page.numeroPagina;
            this.listarPagina();
            console.log(json.data);
            console.log(json.page);
          }
        }
      );
    }else if(this.busquedaPorCategorias){
      console.log(this.numeroPagina);
      this.consultasService.filtrarPorCategorias(this.categoriasFiltro,this.numeroPagina).subscribe(
        json => {
          if (json.data == null && json.page == null) {
            console.log(json.mensaje);
          } else {
            this.listaObjetoAprendizajeDTO = json.data;
            this.numeroPagina = json.page.numeroPaginas;
            this.pagina = json.page.numeroPagina;
            this.listarPagina();
            console.log(json.data);
            console.log(json.page);
          }
        }
      );
    }
  }

  public ultimaPagina(): void {
    if (this.primeraPaginacion) {
      this.traerPaginacion(this.numeroPagina);
    }
  }
  private listarPagina(): void {
    for (var _i = 0; _i < this.numeroPagina; _i++) {
      this.listaPaginas.push(_i + 1);
    }
  }

  public aumentarPagina(): void {
    if (this.pagina <= this.numeroPagina) {
      this.traerPaginacion(this.pagina + 2);
    }
  }

  public disminuirPagina(): void {
    if (this.pagina > 0) {
      this.traerPaginacion(this.pagina);
    }
  }

  private limpiarLista(): void {
    this.listaPaginas = [];
  }

  mostrarText(): void {
    this.focus = true;
  }

  mostrarTabla(): boolean {
    return this.listaObjetoAprendizajeDTO.length > 0;
  }

  onItemSelect(item: Categoria) {
    this.categoriasFiltro.push(item);
  }
  onSelectAll(items: Categoria[]){
    this.categoriasFiltro = items;
  }

  onItemDeSelect(item: Categoria){
    for( let i = 0; i < this.categoriasFiltro.length; i++ ){
      if(this.categoriasFiltro[i].nombre === item.nombre){
        this.categoriasFiltro.splice(i);
      }
    }


  }

  valorSearch(){
    alert(this.textConsulta);
    console.log(this.textConsulta);
  }

  listarCategorias(){
    console.error(this.categoriasFiltro);
    //se desactiva la pag por defecto
    this.primeraPaginacion =  false;
    //se activa la busqueda por categorias
    this.busquedaPorCategorias = true;
    //se renueva a la pag 1
    this.pagina = 0;
    this.numeroPagina = 0;
    this.listaObjetoAprendizajeDTO = [];
    this.limpiarLista();
    if(this.listarCategorias.length > 0){
      this.consultasService.filtrarPorCategorias(this.categoriasFiltro,this.pagina).subscribe(
        json => {
          if (json.data == null && json.page == null) {
            console.log(json.mensaje);
          } else {
            this.listaObjetoAprendizajeDTO = json.data;
            this.numeroPagina = json.page.numeroPaginas;
            this.pagina = json.page.numeroPagina;
            this.listarPagina();
            console.log(json.data);
            console.log(json.page);
          }
        }
      );
    }

  }


}
