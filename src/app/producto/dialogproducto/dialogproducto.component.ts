import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/models/producto';
import { ApiProductoService } from 'src/app/services/api-producto.service';
import { Response } from 'src/app/models/response';

@Component({
  selector: 'app-dialogproducto',
  templateUrl: './dialogproducto.component.html',
  styleUrls: ['./dialogproducto.component.scss'],
})

export class DialogproductoComponent {


  public id: number;
  public nombre: string;
  public descripcion: string;
  public precioVenta: number;
  public precioCompra: number;
  public cantidadStock: number;

  constructor(
    public dialogRef: MatDialogRef<DialogproductoComponent>,
    public apiProducto: ApiProductoService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public producto: Producto
  ) {
    if (this.producto != null) {
      this.id = producto.id;
      this.nombre = producto.nombre;
      this.descripcion = producto.descripcion;
      this.precioVenta = producto.precioVenta;
      this.precioCompra = producto.precioCompra;
      this.cantidadStock = producto.cantidadStock;
    }
  }

  close() {
    this.dialogRef.close();
  }

  addProducto() {
    const producto: Producto = {
      id: 0,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precioVenta: this.precioVenta,
      precioCompra: this.precioCompra,
      cantidadStock: this.cantidadStock,
    };
    this.apiProducto.add(producto).subscribe((response) => {
      
      if (response.succes === 1) {
        this.dialogRef.close();
        this.snackBar.open(response.mesage, '', {
          duration: 2000,
        });
      }
    });
  }

  editProducto() {
    const producto: Producto = {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precioVenta: this.precioVenta,
      precioCompra: this.precioCompra,
      cantidadStock: this.cantidadStock,
    };

    this.apiProducto.edit(producto).subscribe((response) => {
      if (response.succes === 1) {
        this.dialogRef.close();
        this.snackBar.open(response.mesage, '', {
          duration: 2000,
        });
      }
    });
  }
}
