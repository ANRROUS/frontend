import { Injectable } from '@angular/core';
import api from './axios.config';
import { Usuario } from '../models/usuario.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable(); // componente puede suscribirse

  async login(correo: string, clave: string): Promise<Usuario> {
    const res = await api.post<Usuario>(
      '/login',
      { correo, clave }
    );
    this.usuarioSubject.next(res.data);
    return res.data;
  }

  async registrar(usuario: Usuario): Promise<Usuario> {
    const res = await api.post<Usuario>('/register', usuario, {
      withCredentials: true,
    });
    return res.data;
  }

  async verificarSesion(): Promise<void> {
    try {
      const res = await api.get<Usuario>('/usuario/actual', {
        withCredentials: true,
      });
      this.usuarioSubject.next(res.data);
    } catch (err) {
      this.usuarioSubject.next(null);
    }
  }

  async logout(): Promise<void> {
    await api.get('/logout');
    this.usuarioSubject.next(null);
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioSubject.value;
  }
}
