import api from './axios.config';
import { Producto } from '../models/producto.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // 👈 Esto es lo más importante
})

export class ProductoService {
  async listar(): Promise<Producto[]> {
    const res = await api.get<Producto[]>('/productos');
    return res.data;
  }

  async obtenerPorId(id: number): Promise<Producto> {
    const res = await api.get<Producto>(`/productos/${id}`);
    return res.data;
  }

  async registrar(producto: Producto): Promise<Producto> {
    const res = await api.post<Producto>('/productos/registrar', producto);
    return res.data;
  }

  async actualizar(producto: Producto): Promise<Producto> {
    const res = await api.put<Producto>('/productos', producto);
    return res.data;
  }

  async eliminar(id: number): Promise<void> {
    await api.delete(`/productos/${id}`);
  }

  async listarPorCategoria(categoriaId: number): Promise<Producto[]> {
    const res = await api.get<Producto[]>(`/productos/categorias/${categoriaId}`);
    return res.data;
  }
}