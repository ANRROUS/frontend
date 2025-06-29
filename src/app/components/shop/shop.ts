import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { HomeCartService } from '../../services/home.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  templateUrl: './shop.html',
  imports: [CommonModule],
  styleUrls: ['./shop.css'],
})
export class Shop implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  categoriaSeleccionada: number | null = null;
  resultados: number = 0;

  constructor(
    private productoService: ProductoService,
    private homeService: HomeCartService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.categoriaSeleccionada = params['categoriaId']
        ? Number(params['categoriaId'])
        : null;
      this.cargarDatos();
    });
  }

  onCategoriaSeleccionada(categoriaId: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { categoriaId },
      queryParamsHandling: 'merge',
    });
  }

  cargarDatos(): void {
    // Categorías
    this.homeService
      .listarCategorias()
      .then((categorias) => (this.categorias = categorias));
    // Productos
    if (this.categoriaSeleccionada) {
      this.productoService
        .listarPorCategoria(this.categoriaSeleccionada)
        .then((productos) => {
          this.productos = productos;
          this.resultados = productos.length;
        });
    } else {
      this.productoService.listar().then((productos) => {
        this.productos = productos;
        this.resultados = productos.length;
      });
    }
  }

  agregarAlCarrito(producto: Producto,cantidad:number): void {
   const usuario = this.authService.getUsuarioActual();
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }
    this.homeService.agregarAlCarrito(producto.id, cantidad)
      .then(() => {
        this.router.navigate(['/carrito']);
        console.log(`Producto agregado al carrito`);
      })
      .catch((error) => {
        console.error('Error al agregar al carrito:', error);
      });
  }
}
