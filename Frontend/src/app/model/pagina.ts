import { Seccion } from './seccion';
import { Enlace } from './enlace';

export class Pagina {

    id:number;
    nombrePagina : string;
    seccion : number;
    tipo : number;
    contenidoPagina:string;
    enlaces:Array<Enlace>;

}
