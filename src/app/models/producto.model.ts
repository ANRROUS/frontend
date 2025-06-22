export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: String;
  categoria: Categoria;
}

export interface Categoria {
  id: number;
  nombre: string;
  imagen: string;
}
