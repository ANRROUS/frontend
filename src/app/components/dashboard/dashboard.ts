import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Producto, Categoria } from '../../models/producto.model';
import { Usuario } from '../../models/usuario.model';
import { NgIf, NgFor, NgClass, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, CurrencyPipe, FormsModule],
  providers: [DashboardService]
})
export class Dashboard implements OnInit {
  vista: 'productos' | 'usuarios' = 'productos';
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  usuarios: Usuario[] = [];

  // Modales y selección
  modalProductoAbierto = false;
  modalUsuarioAbierto = false;
  productoSeleccionado: Producto | null = null;
  usuarioSeleccionado: Usuario | null = null;

  constructor(public dashboardService: DashboardService) {}

  ngOnInit() {
    this.cargarVista('productos');
  }

  cargarVista(vista: 'productos' | 'usuarios', event?: Event) {
    if (event) event.preventDefault();
    this.vista = vista;
    if (vista === 'productos') {
      this.dashboardService.listarProductos().then(data => this.productos = data);
      this.dashboardService.listarCategorias().then(data => this.categorias = data);
    } else if (vista === 'usuarios') {
      this.dashboardService.listarUsuarios().then(data => this.usuarios = data);
    }
  }

  setRowHover(event: MouseEvent, hover: boolean) {
    const tr = event.currentTarget as HTMLElement | null;
    if (tr) {
      tr.style.backgroundColor = hover ? 'rgba(211, 66, 66, 0.05)' : 'transparent';
    }
  }

  // PRODUCTOS
  abrirModalAgregarProducto() {
    this.productoSeleccionado = {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagen: '',
      categoria: null as any
    };
    this.modalProductoAbierto = true;
  }

  abrirModalEditarProducto(prod: Producto) {
    // Copia el producto y referencia la categoría exacta de la lista
    const categoriaRef = this.categorias.find(cat => cat.id === prod.categoria?.id);
    this.productoSeleccionado = { ...prod, categoria: categoriaRef ? categoriaRef : prod.categoria };
    this.modalProductoAbierto = true;
  }

  cerrarModalProducto() {
    this.modalProductoAbierto = false;
    this.productoSeleccionado = null;
  }

  guardarProducto(producto: Producto) {
    if (producto.id) {
      this.dashboardService.actualizarProducto(producto.id, producto).then(() => {
        this.cargarVista('productos');
        this.cerrarModalProducto();
      });
    } else {
      this.dashboardService.registrarProducto(producto).then(() => {
        this.cargarVista('productos');
        this.cerrarModalProducto();
      });
    }
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro que deseas eliminar este producto?')) {
      this.dashboardService.eliminarProducto(id).then(() => this.cargarVista('productos'));
    }
  }

  // USUARIOS
  abrirModalAgregarUsuario() {
    this.usuarioSeleccionado = {
      id: 0,
      nombre: '',
      apellido: '',
      correo: '',
      clave: '',
      direccion: '',
      telefono: '',
      rol: 'CLIENTE'
    };
    this.modalUsuarioAbierto = true;
  }

  abrirModalEditarUsuario(usr: Usuario) {
    this.usuarioSeleccionado = { ...usr };
    this.modalUsuarioAbierto = true;
  }

  cerrarModalUsuario() {
    this.modalUsuarioAbierto = false;
    this.usuarioSeleccionado = null;
  }

  guardarUsuario(usuario: Usuario) {
    if (usuario.id) {
      this.dashboardService.actualizarUsuario(usuario.id, usuario).then(() => {
        this.cargarVista('usuarios');
        this.cerrarModalUsuario();
      });
    } else {
      this.dashboardService.registrarUsuario(usuario).then(() => {
        this.cargarVista('usuarios');
        this.cerrarModalUsuario();
      });
    }
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro que deseas eliminar este usuario?')) {
      this.dashboardService.eliminarUsuario(id).then(() => this.cargarVista('usuarios'));
    }
  }
}
