import api from './axios.config';
import { Producto } from '../models/producto.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // 👈 Esto es lo más importante
})

export class ShopService {
  async listarProductos(categoriaId?: number): Promise<Producto[]> {
    const url = categoriaId 
      ? `/api/productos?categoriaId=${categoriaId}`
      : '/api/shop';
    const res = await api.get<Producto[]>(url);
    return res.data;
  }
}