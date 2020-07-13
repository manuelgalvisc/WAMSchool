import { Categoria } from './categoria';
import { User } from './user';

export class ObjetoAprendizaje {
  id: number;
  tituloOA: string;
  descripcion: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  propietario: User;
  estado: boolean;
  categoria: Categoria[];
  visitas: number;
}
