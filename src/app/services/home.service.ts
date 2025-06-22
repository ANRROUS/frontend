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
    agregarAlCarrito(producto: Producto, cantidad: number): void {
        const itemExistente = this.carritoItems.find(item =>
            item.producto?.id === producto.id
        );

        if (itemExistente && itemExistente.producto) {
            itemExistente.cantidad = (itemExistente.cantidad || 0) + cantidad;
            itemExistente.subtotal = itemExistente.cantidad * producto.precio;
        } else {
            this.carritoItems.push({
                producto,
                cantidad,
                precio_unitario: producto.precio,
                subtotal: producto.precio * cantidad
            } as DetallePedido); // Type assertion
        }
    }

    obtenerCarrito(): Partial<DetallePedido>[] {
        return this.carritoItems;
    }

    calcularTotal(): number {
        return this.carritoItems.reduce((total, item) =>
            total + (item.subtotal || 0), 0
        );
    }

    async procesarCompra(): Promise<void> {
        if (this.carritoItems.length === 0) {
            throw new Error('Carrito vacío');
        }

        await api.post('/ProcesarCompra', {
            items: this.carritoItems
        });

        this.carritoItems = [];
    }
}