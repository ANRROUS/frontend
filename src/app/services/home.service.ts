import api from './axios.config';
import { Producto } from '../models/producto.model';
import { Categoria } from '../models/categoria.model';
import { DetallePedido } from '../models/detalle-pedido.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // 👈 Esto es lo más importante
})

export class HomeCartService {
    private carritoItems: Partial<DetallePedido>[] = []; // Usamos Partial para propiedades opcionales

    /* ========== MÉTODOS HTTP ========== */
    async listarProductos(): Promise<Producto[]> {
        const res = await api.get<Producto[]>('/');
        return res.data;
    }

    async listarCategorias(): Promise<Categoria[]> {
        const res = await api.get<Categoria[]>('/categorias');
        return res.data;
    }

    /* ========== MÉTODOS CARRITO ========== */
    async agregarAlCarrito(productoId: number, cantidad: number): Promise<void> {
    await api.post('/carrito', { productoId, cantidad }, { withCredentials: true });
    }

    async obtenerCarrito(): Promise<DetallePedido[]> {
    const res = await api.get<DetallePedido[]>('/carrito', { withCredentials: true });
    return res.data;
    }

    async procesarCompra(): Promise<void> {
    await api.post('/procesar-compra', {}, { withCredentials: true });
    this.carritoItems = [];
    }
}