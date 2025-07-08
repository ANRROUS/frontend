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

    // Guarda el token JWT
    localStorage.setItem('token', res.data.token);

    // Construir objeto Usuario desde la respuesta
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

  // ✅ REGISTRO: ya no se necesita withCredentials
  async registrar(usuario: Usuario): Promise<Usuario> {
    const res = await api.post<Usuario>('/api/register', usuario);
    return res.data;
  }

  // ✅ VERIFICACIÓN: consulta los datos del usuario con el token
  async verificarSesion(): Promise<void> {
    try {
      const res = await api.get<Usuario>('/api/usuario/actual');
      this.usuarioSubject.next(res.data);
    } catch (err) {
      this.usuarioSubject.next(null);
    }
  }

  // ✅ LOGOUT: elimina el token
  async logout(): Promise<void> {
    localStorage.removeItem('token');
    this.usuarioSubject.next(null);
  }

  // ✅ Obtener el usuario actual desde memoria
  getUsuarioActual(): Usuario | null {
    return this.usuarioSubject.value;
  }

  // ✅ Saber si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
