import { Pagina } from '../model/pagina';

export class SeccionDTO {
    idSeccion:number;
    nombreSeccion:string;
    descripcion:string;
    posInOA:number;
    paginas:Pagina[];
    idOA:number;
}
