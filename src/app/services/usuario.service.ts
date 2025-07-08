import api from './axios.config';
import { Usuario } from '../models/usuario.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // 👈 Esto es lo más importante
})

export class UsuarioService {
  async listar(): Promise<Usuario[]> {
    const res = await api.get<Usuario[]>('/api/usuarios');
    return res.data;
  }

  async obtenerPorId(id: number): Promise<Usuario> {
    const res = await api.get<Usuario>(`/api/usuarios/${id}`);
    return res.data;
  }

  async registrar(usuario: Usuario): Promise<Usuario> {
    const res = await api.post<Usuario>('/api/usuarios/registrar', usuario);
    return res.data;
  }

  async actualizar(usuario: Usuario): Promise<Usuario> {
    const res = await api.put<Usuario>('/api/usuarios', usuario);
    return res.data;
  }
}