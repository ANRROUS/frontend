import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { HomeCartService } from '../../services/home.service';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  imports: [CommonModule, NgbCarouselModule, RouterModule],
  styleUrl: './home.css'
})

export class Home implements OnInit {

  productos: Producto[] = [];
  categorias: Categoria[] = [];

  constructor(
  private productoService: ProductoService,
  private homeCartService: HomeCartService
  ){}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos(): void {
    this.productoService.listar()
      .then(productos => this.productos = productos)
      .catch(error => console.error('Error cargando productos:', error));
  }

  cargarCategorias(): void {
    this.homeCartService.listarCategorias()
      .then(categorias => this.categorias = categorias)
      .catch(error => console.error('Error cargando categorías:', error));
  }

    // Datos para el carrusel
  carouselImages = [
    {
      src: 'https://shop.bts-official.us/cdn/shop/files/jh_D2C_Main_Page_Banner_Web.jpg?v=1742517935&width=2000',
      alt: 'BTS Banner'
    },
    {
      src: 'https://shop.bts-official.us/cdn/shop/files/BTS-00001-Golden-Desktop.png?v=1740532808&width=1200',
      alt: 'BTS Lightstick'
    },
    {
      src: 'https://shop.bts-official.us/cdn/shop/files/BTS-00001-Muse-Desktop.png?v=1740443646&width=1200',
      alt: 'BTS Merch'
    }
  ];

  // Configuración del carrusel
  carouselConfig = {
    interval: 3000,
    keyboard: true,
    pauseOnHover: true
  };

  // Datos para productos destacados
  productosDestacados = [
    {
      nombre: 'Baby Plush Keyring Orange Party',
      imagen: 'https://cdn-contents.weverseshop.io/public/shop/8bda2d1e7eb4018ad00e87de37e0ad3f.png?w=720&q=95',
      precio: 14.16,
      precioOriginal: 30.00
    },
    {
      nombre: 'Villain Plush Keyring Angel & Villain',
      imagen: 'https://cdn-contents.weverseshop.io/public/shop/e401d405d6d51bdc50dca741fc85ba94.jpg?w=720&q=95',
      precio: 13.37,
      precioOriginal: 30.00
    },
    {
      nombre: 'Baby Plush Keyring Newborn Season2',
      imagen: 'https://cdn-contents.weverseshop.io/public/shop/652fd85f42215ddf2acf37fe0fbff2b5.png?w=720&q=95',
      precio: 13.37,
      precioOriginal: 30.00
    },
    {
      nombre: 'BABY LYING DOLL FLUFFY',
      imagen: 'https://cdn-contents.weverseshop.io/public/shop/d7823c535baa5e712dfd2213ce3deb2d.png?w=720&q=95',
      precio: 25.97,
      precioOriginal: 30.00
    }
  ];

  agregarAlCarrito(producto: Producto): void {
    this.homeCartService.agregarAlCarrito(producto.id, 1);
    // Opcional: Mostrar notificación
    alert(`${producto.nombre} añadido al carrito`);
  }
}