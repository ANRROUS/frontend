import api from './axios.config';
import { Pedido } from '../models/pedido.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // 👈 Esto es lo más importante
})

export class PedidoService {
    async listar(): Promise<Pedido[]> {
        const res = await api.get<Pedido[]>('/pedidos');
        return res.data;
    }

    async obtenerPorId(id: number): Promise<Pedido> {
        const res = await api.get<Pedido>(`/pedidos/${id}`);
        return res.data;
    }

    async registrar(pedido: Pedido): Promise<Pedido> {
        const res = await api.post<Pedido>('/pedidos', pedido);
        return res.data;
    }

    async actualizar(pedido: Pedido): Promise<Pedido> {
        const res = await api.put<Pedido>('/pedidos', pedido);
        return res.data;
    }

    async eliminar(id: number): Promise<void> {
        await api.delete(`/pedidos/${id}`);
    }
}
