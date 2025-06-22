import { Pedido } from './pedido.model';
import { Producto } from './producto.model';

export interface DetallePedido {
  id: number;
  pedido: Pedido;
  producto: Producto;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}
