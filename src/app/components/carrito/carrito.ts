import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import api from '../../services/axios.config';

@Component({
  selector: 'app-cart',
  templateUrl: './carrito.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./carrito.css']
})
export class Carrito implements OnInit {
  carritoItems: any[] = [];
  total: number = 0;
  mensaje: string = '';

  ngOnInit(): void {
    this.cargarCarritoDesdeBackend();
  }

  // ✅ PARSEA LA PÁGINA /carrito Y EXTRAER DATOS (simple, pero poco flexible)
  async cargarCarritoDesdeBackend(): Promise<void> {
    try {
      const res = await api.get('/carrito', {
        responseType: 'text',
        withCredentials: true
      });

      const parser = new DOMParser();
      const doc = parser.parseFromString(res.data, 'text/html');
      const filas = doc.querySelectorAll('.row.mb-2.align-items-center');

      this.carritoItems = [];
      let total = 0;

      filas.forEach(row => {
        const columnas = row.querySelectorAll('div');

        const nombre = columnas[1]?.textContent?.trim() || '';
        const precio = parseFloat(columnas[2]?.textContent?.replace('$', '') || '0');
        const cantidadInput = columnas[3]?.querySelector('input') as HTMLInputElement;
        const cantidad = parseInt(cantidadInput?.value || '1');
        const subtotal = precio * cantidad;

        this.carritoItems.push({
          producto: { nombre },
          precio_unitario: precio,
          cantidad,
          subtotal
        });

        total += subtotal;
      });

      this.total = total;

    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  }

  async procesarCompra(): Promise<void> {
    try {
      await api.post('/ProcesarCompra', null, {
        withCredentials: true
      });
      this.mensaje = '¡Compra realizada con éxito!';
      this.carritoItems = [];
      this.total = 0;
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      this.mensaje = 'Error al procesar la compra';
    }
  }
}
