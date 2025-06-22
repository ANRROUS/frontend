import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [RouterModule, CommonModule],
})
export class HeaderComponent implements OnInit {
  logoPath = 'assets/img/icon.png';
  usuario: Usuario | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.usuario$.subscribe((usuario) => {
      this.usuario = usuario;
    });

    this.authService.verificarSesion(); // verifica en primera carga
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/']); // redirige al home
    });
  }
}
