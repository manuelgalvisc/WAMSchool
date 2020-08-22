import { Enunciado } from './enunciado';
import { Seccion } from './seccion';

export class ActividadCuestionario{
    id:number;
    introduccion:string;
    enunciados:Enunciado[];
    seccionCuestionario:Seccion;
}