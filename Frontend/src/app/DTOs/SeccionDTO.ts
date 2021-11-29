import { Pagina } from '../model/pagina';
/**
 * Clase DTO Para la recepcion de info desde el backend
 */
export class SeccionDTO {
    idSeccion:number;
    nombreSeccion:string;
    descripcion:string;
    posInOA:number;
    paginas:Pagina[];
    idOA:number;
}
