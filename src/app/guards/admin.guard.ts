import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const usuario = this.authService.getUsuarioActual();

    if (!usuario || usuario.rol !== 'ADMIN') {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
