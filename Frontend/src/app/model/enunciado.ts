import { OpcionMultiple } from './opcionMultiple';
import { PreguntaAbierta } from './preguntaAbierta';

export class Enunciado{
    id:number;
    enunciado:string;
    listaOpcionesMultiples:OpcionMultiple[];
    listaPreguntasCompletar:PreguntaAbierta[];
    listaPreguntas:any[];
}