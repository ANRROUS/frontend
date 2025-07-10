// carrito.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeCartService } from '../../services/home.service';

@Component({
  selector: 'app-cart',
  templateUrl: './carrito.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./carrito.css']
})
export class Carrito implements OnInit {
  carritoItems: any[] = [];
  total: number = 0;
  mensaje: string = '';

  constructor(private homeService: HomeCartService) {}

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito(): void {
    this.homeService.obtenerCarrito()
      .then(items => {
        this.carritoItems = items;
        this.total = items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
      })
      .catch(error => {
        console.error('Error al obtener el carrito:', error);
        this.mensaje = 'Error al cargar el carrito';
      });
  }

  eliminarDelCarrito(productoId: number): void {
    this.homeService.eliminarDelCarrito(productoId)
      .then(() => {
        console.log(`Producto ${productoId} eliminado del carrito`);
        this.obtenerCarrito();
      })
      .catch(error => {
        this.mensaje = 'Error al eliminar el producto del carrito';
        console.error('Error al eliminar del carrito:', error);
      });
  }

  actualizarCarrito(productoId: number, cantidad: number): void {
    // Validar cantidad mínima
    if (cantidad < 1) {
      cantidad = 1;
      // Buscar el item para actualizar la vista
      const item = this.carritoItems.find(i => i.producto.id === productoId);
      if (item) {
        setTimeout(() => item.cantidad = 1, 0);
      }
      this.mensaje = 'La cantidad mínima es 1';
      return;
    }

    this.homeService.actualizarCarrito(productoId, cantidad)
      .then(() => {
        console.log(`Carrito actualizado`);
        this.obtenerCarrito();
      })
      .catch(error => {
        this.mensaje = 'Error al actualizar el carrito';
        console.error('Error al actualizar el carrito:', error);
      });
  }

  procesarCompra(): void {
    if (this.carritoItems.length === 0) {
      this.mensaje = 'El carrito está vacío';
      return;
    }

    this.procesando = true;
    this.mensaje = '';
    
    this.homeService.procesarCompra()
      .then(() => {
        console.log('Compra procesada con éxito');
        this.mensaje = '¡Compra realizada con éxito!';
        this.carritoItems = [];
        this.total = 0;
      })
      .catch(error => {
        this.mensaje = 'Error al procesar la compra';
        console.error('Error al procesar la compra:', error);
        this.procesando = false;
      });
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/img/default.png';
  }
}