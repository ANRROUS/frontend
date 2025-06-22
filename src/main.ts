import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // Opcional: solo si usas animaciones
import { provideZoneChangeDetection } from '@angular/core'; // Necesario para change detection
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';
import '@angular/localize/init';
import 'zone.js';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),           // Configuración del Router
    provideHttpClient(),             // Para HttpClient
    provideZoneChangeDetection({     // Configura Zone.js (requerido)
      eventCoalescing: true,         // Optimización para eventos
      runCoalescing: true            // Optimización para detección de cambios
    }),
    provideAnimations(),             // Opcional: si necesitas animaciones (usa NoopAnimationsModule si no)
    // Otros providers globales aquí (ej: servicios, interceptors)
  ]
}).catch(err => console.error(err));