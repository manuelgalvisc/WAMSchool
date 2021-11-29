import { Categoria } from '../model/categoria';
import { Seccion } from '../model/seccion';
/**
 * Clase DTO Para la recepcion de info desde el backend
 */
export class ObjetoAprendizajeDTO{
    nombreCompletoPropietario: string;
    emailPropiertario : string;
    idOA : number;
    tituloOA : string;
    descripcion : string;
    fechaActualizacion : Date;
    estadoOA : string;
    categorias : Categoria[]
    visitas : number;
    secciones: Seccion[];
}
