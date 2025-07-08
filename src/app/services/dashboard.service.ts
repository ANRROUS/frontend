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
    const res = await api.get<Producto[]>('/admin/productos');
    return res.data;
  }

  async obtenerProducto(id: number): Promise<Producto> {
    const res = await api.get<Producto>(`/admin/productos/${id}`);
    return res.data;
  }

  async registrarProducto(producto: Producto): Promise<Producto> {
    const res = await api.post<Producto>('/admin/productos', producto);
    return res.data;
  }

  async actualizarProducto(id: number, producto: Producto): Promise<Producto> {
    const res = await api.put<Producto>(`/admin/productos/${id}`, producto);
    return res.data;
  }

  async eliminarProducto(id: number): Promise<void> {
    await api.delete(`(admin/productos/${id}`);
  }

  // === CATEGORIAS ===
  async listarCategorias(): Promise<Categoria[]> {
    const res = await api.get<Categoria[]>('/admin/categorias');
    return res.data;
  }

  // === USUARIOS ===
  async listarUsuarios(): Promise<Usuario[]> {
    const res = await api.get<Usuario[]>('/admin/usuarios');
    return res.data;
  }

  async obtenerUsuario(id: number): Promise<Usuario> {
    const res = await api.get<Usuario>(`/admin/usuarios/${id}`);
    return res.data;
  }

  async registrarUsuario(usuario: Usuario): Promise<Usuario> {
    const res = await api.post<Usuario>('/admin/usuarios', usuario);
    return res.data;
  }

  async actualizarUsuario(id: number, usuario: Usuario): Promise<Usuario> {
    const res = await api.put<Usuario>(`/admin/usuarios/${id}`, usuario);
    return res.data;
  }

  async eliminarUsuario(id: number): Promise<void> {
    await api.delete(`/admin/usuarios/${id}`);
  }
}
