import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { HomeCartService } from '../../services/home.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

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
    private http: HttpClient // ← necesario para enviar a /AgregarCarrito
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

  agregarAlCarrito(producto: Producto, cantidad: number): void {
    const params = new HttpParams()
      .set('id', producto.id.toString())
      .set('cantidad', cantidad.toString());

    this.http.post('/AgregarCarrito', null, { params, withCredentials: true }).subscribe();
  }
}
