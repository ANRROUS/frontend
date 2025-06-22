import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.css']
})
export class Login {
  correo: string = '';
  clave: string = '';
  error: string | null = null;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.error = null;
    this.authService.login(this.correo, this.clave)
      .then(() => {
        this.router.navigate(['/']); // Redirige al home después del login
      })
      .catch(error => {
        this.error = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
        console.error('Error en login:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  loginWithGoogle(): void {
    // Implementación opcional para login con Google
    console.log('Login con Google');
    this.error = 'Funcionalidad en desarrollo';
  }
}