import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Carrito } from 'src/app/models/carrito';
import { Producto } from 'src/app/models/producto';
import { ApiProductoService } from 'src/app/services/api-producto.service';
import { ApicarritoService } from 'src/app/services/apicarrito.service';
import { ActivatedRoute } from '@angular/router';
import { DetalleCarrito } from 'src/app/models/detalleVenta';

@Component({
  selector: 'app-producto-carrito',
  templateUrl: './producto-carrito.component.html',
  styleUrls: ['./producto-carrito.component.scss'],
})
export class ProductoCarritoComponent implements OnInit {
  cantidad: number = 1;
  public producto: Producto;
  idDetalle: number = 1;

  constructor(
    private _apiCarrito: ApicarritoService,
    public snackBar: MatSnackBar,
    private _apiProducto: ApiProductoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idProductoSend = +params['idProducto']; // El '+' convierte el parámetro de cadena a número si es necesario
      this.getProductoById(idProductoSend);
    });
  }

  getProductoById(id: number) {
    this._apiProducto.getProductById(id).subscribe((response) => {
      this.producto = response.data;
    });
  }

  addCarrito() {
    // Obtener el carrito actual del localStorage
    let carrito: DetalleCarrito[] = JSON.parse(
      localStorage.getItem('carrito') || '[]'
    );

    // Obtener el último idDetalle en el carrito
    let ultimoIdDetalle =
      carrito.length > 0 ? carrito[carrito.length - 1].idDetalle : 0;
    // Incrementar el idDetalle para el nuevo detalleCarrito
    ultimoIdDetalle += 1;
    // Buscar si el producto ya existe en el carrito
    const existingItemIndex = carrito.findIndex(
      (item) => item.producto.id === this.producto.id
    );
    if (existingItemIndex !== -1) {
      // Si el producto ya está en el carrito, actualizar cantidad y subtotal
      carrito[existingItemIndex].cantidad += this.cantidad;
      carrito[existingItemIndex].subTotal +=
        this.producto.precioVenta * this.cantidad;

    } else {
      // Si el producto no está en el carrito, agregar un nuevo detalleCarrito con el nuevo idDetalle
      const nuevoDetalle: DetalleCarrito = {
        idDetalle: ultimoIdDetalle,
        cantidad: this.cantidad,
        subTotal: this.producto.precioVenta * this.cantidad,
        producto: {
          id: this.producto.id,
          nombre: this.producto.nombre,
          descripcion: this.producto.descripcion,
          precioCompra: this.producto.precioCompra,
          precioVenta: this.producto.precioVenta,
          cantidadStock: this.producto.cantidadStock,
        },
      };
      carrito.push(nuevoDetalle);

      const carr: DetalleCarrito = {
        idDetalle: ultimoIdDetalle,
        cantidad: this.cantidad,
        subTotal: this.producto.precioVenta * this.cantidad,
        producto: {
          id: this.producto.id,
          nombre: this.producto.nombre,
          descripcion: this.producto.descripcion,
          precioCompra: this.producto.precioCompra,
          precioVenta: this.producto.precioVenta,
          cantidadStock: this.producto.cantidadStock,
        },
      };
    }
    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.snackBar.open(this.generarMensajeCantidad(this.cantidad), '', {
      duration: 2000,
    });

    this.producto.cantidadStock -= this.cantidad;
    this._apiProducto.edit(this.producto).subscribe();
  }

  incrementarCantidad() {
    if (this.cantidad >= this.producto.cantidadStock) {
      alert('No hay stock disponible');
    } else {
      this.cantidad++;
    }
  }

  decrementarCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  generarMensajeCantidad(cantidad: number): string {
    return cantidad === 1
      ? 'Se agregó ' + cantidad + ' producto al carrito...'
      : 'Se agregaron ' + cantidad + ' productos al carrito...';
  }
}
