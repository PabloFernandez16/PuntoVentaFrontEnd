import { Component, OnInit } from '@angular/core';
import { ApicarritoService } from '../services/apicarrito.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Carrito } from '../models/carrito';
import { MatDialog } from '@angular/material/dialog';
import { DialogdeletecomponentComponent } from '../common/delete/dialogdeletecomponent.component';
import { ApiProductoService } from '../services/api-producto.service';
import { Producto } from '../models/producto';
import { Observable, catchError, forkJoin, map } from 'rxjs';
import { ApiventaService } from '../services/apiventa.service';
import { Response } from '../models/response';
import { Venta } from '../models/venta';
import { DetalleCarrito } from '../models/detalleVenta';
import { Cliente } from '../models/cliente';
import { ApiclienteService } from '../services/apicliente.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  errorMessage: string | null = null;

  total: number = 0;
  listaCar: DetalleCarrito[] = [];
  carrito: Carrito;

  clientes: Cliente[] = [];
  ClienteSeleccionado: number;

  producto: Producto;
  public columnas: string[] = [
    'IdProducto',
    'Descripcion',
    'Precio',
    'Cantidad',
    'SubTotal',
    'Actions',
  ];

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public _apiProducto: ApiProductoService,
    public _apiVenta: ApiventaService,
    public _apiCliente: ApiclienteService
  ) {}

  ngOnInit(): void {
    this._apiCliente.getCliente().subscribe((listaClientes) => {
      this.clientes = listaClientes.data;
    });
    this.getCarrito();
    this.calcularTotal();
  }

  getCarrito() {
    const detalleCarrito: DetalleCarrito[] = JSON.parse( localStorage.getItem('carrito') );
    this.listaCar = detalleCarrito;
  }

  pagar() {
    var client: Cliente;
    this.clientes.forEach(element => {
      

        if(element.id === this.ClienteSeleccionado){
           client = {
            id: element.id, nombre: element.nombre
          }
        }
        
    });
    
  
    const venta: Venta = {
      total: this.total, 
      id: 1, 
      cliente: client, 
      //carrito: carritoLocalStorage 
    }; 

    console.log('----',this.ClienteSeleccionado);
  
    if (this.ClienteSeleccionado === undefined) {
      this.errorMessage = 'Por favor, selecciona un cliente.';
      return;
    }
  
    console.log(venta);
  
    this._apiVenta.add(venta).subscribe((response) => {
      if (response.succes === 1) { 
        this.snackBar.open(response.mesage, '', {
          duration: 3000,
        });
      }
    });
  
    localStorage.removeItem('carrito');
    this.getCarrito();
  }
  

  editarCarrito(carritoId: number, nuevaCantidad: number) {
    // Obtener el carrito actual del localStorage
    let carrito: DetalleCarrito[] = JSON.parse(
      localStorage.getItem('carrito') || '[]'
    );

    // Encontrar el índice del carrito con el ID proporcionado
    const indiceCarrito = carrito.findIndex(
      (item) => item.idDetalle === carritoId
    );

    if (indiceCarrito !== -1) {
      // Realizar la edición en el carrito
      carrito[indiceCarrito].cantidad = nuevaCantidad;
      carrito[indiceCarrito].subTotal =
        carrito[indiceCarrito].producto.precioVenta * nuevaCantidad;

      // Actualizar el localStorage con el carrito editado
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }

  deleteItemFromCarrito(idDetalle: number): void {
    // Obtener el carrito actual del localStorage
    let carrito: DetalleCarrito[] = JSON.parse(
      localStorage.getItem('carrito') || '[]'
    );

    // Encontrar el índice del detalle con el idDetalle proporcionado
    const indexToDelete = carrito.findIndex(
      (item) => item.idDetalle === idDetalle
    );

    if (indexToDelete !== -1) {
      // Eliminar el elemento del carrito
      let detalle: DetalleCarrito = carrito[indexToDelete];
      //regresar los productos a la base de datos
      this._apiProducto.edit(detalle.producto).subscribe();
      carrito.splice(indexToDelete, 1);

      // Guardar el carrito actualizado en el localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
      this.getCarrito();

      this.snackBar.open('Eliminado del Carito', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  incrementarCantidad(element: DetalleCarrito) {
    this.getProductoById(element.producto.id, (producto: Producto) => {
      if (producto.cantidadStock > 0) {
        element.cantidad++;
        this.editarCarrito(element.idDetalle, element.cantidad);
        this.producto.cantidadStock -= 1;
        this.total += this.producto.precioVenta;
        this._apiProducto.edit(this.producto).subscribe();
        this.getCarrito();
      } else {
        alert('No hay stock disponible');
      }
    });
  }

  decrementarCantidad(element: DetalleCarrito) {
    this.getProductoById(element.producto.id, (producto: Producto) => {
      if (element.cantidad > 0) {
        element.cantidad--;
        this.editarCarrito(element.idDetalle, element.cantidad);
        this.producto.cantidadStock += 1;
        this.total -= this.producto.precioVenta;
        this._apiProducto.edit(this.producto).subscribe();
        this.getCarrito();
      }
    });
  }
  //seleciona el producto segun el indice seleccionado en la tabla detallesCarrito
  getProductoById(id: number, callback: (producto: Producto) => void) {
    this._apiProducto.getProductById(id).subscribe((response) => {
      this.producto = response.data;
      callback(this.producto);
      //this.total += this.producto.precioVenta;
    });
  }

  calcularTotal() {
    if (this.listaCar) {
      this.total = this.listaCar.reduce(
        (total, detalle) => total + detalle.subTotal,
        0
      );
    } else {
      this.total = 0;
    }
  }
}
