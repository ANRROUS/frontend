import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  contact() {
    // Navegar a página de contacto o abrir modal
    this.router.navigate(['/contact']);
  }
}