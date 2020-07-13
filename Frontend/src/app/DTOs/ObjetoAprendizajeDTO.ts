import { Categoria } from '../model/categoria';

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
}