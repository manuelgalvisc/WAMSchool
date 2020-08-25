import { Enunciado } from './enunciado';
import { Seccion } from './seccion';

/**
 * Entidad actividad cuestionario
 */
export class ActividadCuestionario{
    id:number;
    introduccion:string;
    enunciados:Enunciado[];
    seccionCuestionario:Seccion;
}