import { Injectable } from '@angular/core';
import api from './axios.config';
import { Producto } from '../models/producto.model';
import { Usuario } from '../models/usuario.model';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  // === PRODUCTOS ===
  async listarProductos(): Promise<Producto[]> {
    const res = await api.get<Producto[]>('/api/productos');
    return res.data;
  }

  async obtenerProducto(id: number): Promise<Producto> {
    const res = await api.get<Producto>(`/api/productos/${id}`);
    return res.data;
  }

  async registrarProducto(producto: Producto): Promise<Producto> {
    const res = await api.post<Producto>('/api/productos', producto);
    return res.data;
  }

  async actualizarProducto(id: number, producto: Producto): Promise<Producto> {
    const res = await api.put<Producto>(`/api/productos/${id}`, producto);
    return res.data;
  }

  async eliminarProducto(id: number): Promise<void> {
    await api.delete(`/api/productos/${id}`);
  }

  // === CATEGORIAS ===
  async listarCategorias(): Promise<Categoria[]> {
    const res = await api.get<Categoria[]>('/api/categorias');
    return res.data;
  }

  // === USUARIOS ===
  async listarUsuarios(): Promise<Usuario[]> {
    const res = await api.get<Usuario[]>('/api/usuarios');
    return res.data;
  }

  async obtenerUsuario(id: number): Promise<Usuario> {
    const res = await api.get<Usuario>(`/api/usuarios/${id}`);
    return res.data;
  }

  async registrarUsuario(usuario: Usuario): Promise<Usuario> {
    const res = await api.post<Usuario>('/api/usuarios', usuario);
    return res.data;
  }

  async actualizarUsuario(id: number, usuario: Usuario): Promise<Usuario> {
    const res = await api.put<Usuario>(`/api/usuarios/${id}`, usuario);
    return res.data;
  }

  async eliminarUsuario(id: number): Promise<void> {
    await api.delete(`/api/usuarios/${id}`);
  }
}
