import { Usuario } from './usuario.model';

export interface Pedido {
  id: number;
  usuario: Usuario;
  fecha: string;
  estado: string;
  total: number;
}
