import api from './axios.config';
import { DetallePedido } from '../models/detalle-pedido.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // 👈 Esto es lo más importante
})

export class DetallePedidoService {
  async listar(): Promise<DetallePedido[]> {
    const res = await api.get<DetallePedido[]>('/detallepedidos');
    return res.data;
  }

  async registrar(detalle: DetallePedido): Promise<DetallePedido> {
    const res = await api.post<DetallePedido>('/detallepedidos', detalle);
    return res.data;
  }

    async actualizar (detalle: DetallePedido): Promise<DetallePedido> {
    const res = await api.put<DetallePedido>('/detallepedidos', detalle);
    return res.data;
  }

  async eliminar(id: number): Promise<void> {
    await api.delete(`/detallepedidos/${id}`);
  }
}