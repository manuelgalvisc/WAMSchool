import { Categoria } from './categoria';
import { User } from './user';

export class ObjetoAprendizaje {
  id: number;
  tituloOA: string;
  descripcion: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  propietario: User;
  estadoOA: string;
  categorias: Categoria[];
  visitas: number;
}
