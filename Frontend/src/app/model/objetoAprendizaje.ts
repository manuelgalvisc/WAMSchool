import { Categoria } from './categoria';

export class ObjetoAprendizaje {
  id: number;
  tituloOA: string;
  descripcion: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  propietario: string;
  estado: boolean;
  categoria: Categoria;
  visitas: number;
}
