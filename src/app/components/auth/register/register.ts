import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  imports: [FormsModule, CommonModule]
})
export class Register {
  usuario: Usuario = {
  id: 0,
  nombre: '',
  apellido: '',
  correo: '',
  clave: '',
  telefono: '',
  direccion: '',
  rol: 'CLIENTE'
  };
  error: string | null = null;
  success: string | null = null;
  loading: boolean = false;
  errorFields: { [key: string]: string } = {};


  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.loading = true;
    this.error = null;
    this.success = null;
    this.errorFields = {};
    this.authService.registrar(this.usuario)
    .then(() => {
      this.success = '¡Registro exitoso! Ahora puedes iniciar sesión.';
    setTimeout(() => this.router.navigate(['/login']), 2000);
    })
    .catch(error => {
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object') {
          this.errorFields = error.response.data;
        } else {
          this.error = error.response.data.error || 'Error al registrar.';
        }
      } else {
        this.error = 'Error al registrar. Verifica los datos y vuelve a intentarlo.';
      }
    })
    .finally(() => {
    this.loading = false;
    });
  }
}