import { Component, OnInit } from '@angular/core';
import { ObjetoAprendizajeDTO } from '../DTOs/ObjetoAprendizajeDTO';
import { ObjetoAprendizaje } from '../model/objetoAprendizaje';
import { ConsultasService } from '../services/consultas.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria';
import { Seccion } from '../model/seccion';
import { stringify } from 'querystring';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOaComponent } from '../modal-oa/modal-oa.component';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SeccionDTO } from '../DTOs/SeccionDTO';
import { SeccionService } from '../services/seccion.service';
import { VisorService } from '../services/visor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/**
 * Componente inicial donde se hace la consulta de los Objetos de apredizaje 
 */
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
  busquedaPorTexto : boolean = false;
  ////
  focus: boolean;
  listaObjetoAprendizajeDTO: ObjetoAprendizajeDTO[] = [];

  //search
  textConsulta : string = "";

  constructor(private consultasService: ConsultasService,
              private categoriaService: CategoriaService,
              private modalService: NgbModal,
              private dataService: DataService,
              private router: Router,
              private seccionService: SeccionService,
              private visorService: VisorService,) {
              }

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
        // this.cargarSeccionesOa();
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
           // this.cargarSeccionesOa();
          }
        }
      );
      //busqueda por categoria seleccionada
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
      ///busqueda por texto 
    }else if(this.busquedaPorTexto){
      console.log(this.numeroPagina);
      this.consultasService.filtrarPorTexto(this.textConsulta,this.numeroPagina).subscribe(
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

  /**
   * metodos para la paginacion 
   */
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
///fin metodos paginacion

/**
 * 
 * @param item metodos para la selecion de caracteristicas
 */
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
//fin metodos categorias

/**
 * metodo encargado de consultar por categorias de no ser la primera paginacion
 */
  listarCategorias(){
    console.log(this.categoriasFiltro);
    //se desactiva la pag por defecto
    this.primeraPaginacion =  false;
    //se activa la busqueda por categorias
    this.busquedaPorCategorias = true;
    //se desactiva la busqueda por texto
    this.busquedaPorTexto = false;
    //se renueva a la pag 1
    this.pagina = 0;
    this.numeroPagina = 0;
    this.listaObjetoAprendizajeDTO = [];
    this.limpiarLista();
    if(this.categoriasFiltro.length > 0){
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


  /**
   * metodo encargado de buscar por texto 
   */
  listarPorTexto(){
    this.busquedaPorTexto = true;
    this.busquedaPorCategorias = false;
    this.primeraPaginacion = false;
    this.pagina = 0;
    this.numeroPagina = 0;
    this.listaObjetoAprendizajeDTO = [];
    this.limpiarLista();
    console.log(this.numeroPagina);
    if(this.textConsulta.length > 0){
      this.consultasService.filtrarPorTexto(this.textConsulta,this.numeroPagina).subscribe(
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
    }else{
      Swal.fire('Debe ingresar texto en buscador!!!', "",'error');
    }
  }

  /**
   * metodo encargado de llamar el modal donde se visualiza la info
   * @param oaInput 
   */
  mostrarModal(oaInput : ObjetoAprendizajeDTO) {
    var sec : Array<Seccion> = this.traerListaSecciones(oaInput.idOA);
    oaInput.secciones =  sec;
    const modalRef = this.modalService.open(ModalOaComponent);
    modalRef.componentInstance.oa = oaInput;
  }

  /**
   * metodo encargado de cargar el editar objeto de aprendizje
   * @param oa 
   */
  editarOA(oa : ObjetoAprendizajeDTO){
    let sec : Array<Seccion> = this.traerListaSecciones(oa.idOA);
    oa.secciones = sec;
    this.dataService.objetoAprendizajeDTO = oa;
    this.router.navigate(['/editarOA']);
  }

  /**
   * metodo encargado de cargar la lista de secciones
   * @param idOA 
   */
  traerListaSecciones(idOA : number): Array<Seccion> {
    var listaSecciones : Array<SeccionDTO> = [];
    var listaSeccionesFinal : Array<Seccion> = [];
    this.seccionService.listarSeccionesOA(idOA).subscribe(
      json =>{
        if(json.data != null){
          listaSecciones = json.data;
          listaSecciones.map((y) => {
            listaSeccionesFinal.push(this.convertirSeccionDTOASeccion(y));
          }
          )
        }
      }
    )
    return listaSeccionesFinal;
  }

  /**
   * convierte una seccion a dto
   * @param dto 
   */
  convertirSeccionDTOASeccion(dto : SeccionDTO):Seccion{
    let seccion :Seccion  = new Seccion();
      seccion.id = dto.idSeccion;
      seccion.nombreSeccion = dto.nombreSeccion;
      seccion.descripcion = dto.descripcion;
      seccion.posInOA = dto.posInOA;
      seccion.objetoAprendizaje = dto.idOA;
    return seccion;
  }

  /**
   * enviar al componente de visualizar
   * @param oa 
   */
  ejecutarOA(oa: ObjetoAprendizajeDTO) {
    let seccion: Array<Seccion> = this.traerListaSecciones(oa.idOA);
    oa.secciones = seccion;
    this.visorService.oa = oa;
    this.visorService.guardarOA(this.visorService.oa);
    this.router.navigate(['/visorOA']);
  }

}
