import { Injectable } from '@angular/core';
import api from './axios.config';
import { Usuario } from '../models/usuario.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable(); // para suscribirse al estado del usuario

  // ✅ LOGIN: guarda el token y actualiza el usuario
  async login(correo: string, clave: string): Promise<Usuario> {
    const res = await api.post<any>('/api/login', { correo, clave });
    localStorage.setItem('token', res.data.token);

    const usuario: Usuario = {
      id: 0,
      correo: res.data.correo,
      nombre: res.data.nombre,
      rol: res.data.rol,
      apellido: '',
      clave: '',
      direccion: '',
      telefono: '',
    };

    this.usuarioSubject.next(usuario);
    return usuario;
  }

  // ✅ REGISTRO
  async registrar(usuario: Usuario): Promise<Usuario> {
    const res = await api.post<Usuario>('/api/register', usuario);
    return res.data;
  }

  // ✅ VERIFICACIÓN con retorno de rol
  async verificarSesion(): Promise<string | null> {
    try {
      const res = await api.get<any>('/api/usuario/actual');

      const usuario: Usuario = {
        id: 0,
        correo: res.data.correo,
        nombre: res.data.nombre,
        rol: res.data.rol,
        apellido: '',
        clave: '',
        direccion: '',
        telefono: '',
      };

      this.usuarioSubject.next(usuario);
      return usuario.rol;
    } catch (err) {
      this.usuarioSubject.next(null);
      return null;
    }
  }

  // ✅ LOGOUT
  async logout(): Promise<void> {
    await api.get('/api/logout', { withCredentials: true });
    localStorage.removeItem('token');
    this.usuarioSubject.next(null);
  }

  // ✅ Acceso directo a usuario actual
  getUsuarioActual(): Usuario | null {
    return this.usuarioSubject.value;
  }

  // ✅ Saber si está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // ✅ Acceder directamente al rol
  getRol(): string | null {
    return this.usuarioSubject.value?.rol || null;
  }
}
