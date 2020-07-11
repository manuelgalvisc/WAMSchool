import { Component, OnInit } from '@angular/core';
import { ObjetoAprendizajeDTO } from '../DTOs/ObjetoAprendizajeDTO';
import { ObjetoAprendizaje } from '../model/objetoAprendizaje';
import { ConsultasService } from '../services/consultas.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria';

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
  // busqueda por categorias
  categoriasFiltro: Categoria[];
  //page
  pagina: number = 0;
  numeroPagina: number = 0;
  primeraPaginacion: boolean = true;
  listaPaginas: Array<number> = [];
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
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  public traerPaginacion(pagina: number): void {
    this.numeroPagina = pagina - 1;
    if (this.primeraPaginacion) {
      console.log(this.numeroPagina);
      this.consultasService.listasOApag(this.numeroPagina).subscribe(
        json => {
          if (json.data == null && json.page == null) {
          } else {
            this.listaObjetoAprendizajeDTO = json.data;
            this.numeroPagina = json.page.numeroPaginas;
            this.pagina = json.page.numeroPagina;
            this.limpiarLista();
            this.listarPagina();
            console.log(json.data);
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

  onItemSelect(item: any) {
    this.categoriasFiltro.push(item);
  }

  valorSearch(){
    alert(this.textConsulta);
    console.log(this.textConsulta);
  }

  listarCategorias(){
    this.consultasService.filtrarPorCategorias(this.categoriasFiltro).subscribe();
  }

}
