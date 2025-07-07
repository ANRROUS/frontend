import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeCartService } from '../../services/home.service';

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

  constructor(
    private homeService: HomeCartService 
  ){}

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito():void {
    this.homeService.obtenerCarrito()
      .then(items => {
        this.carritoItems = items;
        this.total = items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
      })
      .catch(error => console.error('Error al obtener el carrito:', error));
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
    this.homeService.procesarCompra()
      .then(() => {
        console.log('Compra procesada con éxito');
        this.mensaje= '¡Compra realizada con éxito!';
        this.carritoItems = [];
        this.total = 0;
      })
      .catch(error => {
        this.mensaje = 'Error al procesar la compra';
        console.error('Error al procesar la compra:', error);
      });
  }
}
