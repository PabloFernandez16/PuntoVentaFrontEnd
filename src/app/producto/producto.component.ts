import { Component } from '@angular/core';
import { ApiProductoService } from '../services/api-producto.service';
import { Response } from '../models/response';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogproductoComponent } from './dialogproducto/dialogproducto.component';
import { Producto } from '../models/producto';
import { DialogdeletecomponentComponent } from '../common/delete/dialogdeletecomponent.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent {


  prod : Producto;
  lista: any[] = [];
  public columnas: string[] = [
    'Id',
    'Nombre',
    'Descripcion',
    'PrecioVenta',
    'PrecioCompra',
    'CantidadStock',
    'Actions',
  ];
  public base64Image: string | undefined;
  public productoImagen: any;

  public ancho: string = '700px';
  //public columnas : string[] = ['Id', 'Descripcion', 'PrecioVenta', 'PrecioCompra','CantidadStock', 'Categoria','Actions'];

  constructor(
    private _apiProducto: ApiProductoService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  

  ngOnInit(): void {
    this.getProductos();

    
  }

  getProductos() {
    this._apiProducto.getProductos().subscribe((response) => {
      this.lista = response.data;
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogproductoComponent, {
      width: this.ancho,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getProductos();
    });
  }
  openEdit(producto: Producto) {
    const dialogRef = this.dialog.open(DialogproductoComponent, {
      width: this.ancho,
      data: producto,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getProductos();
    });
  }

  delete(producto: Producto) {
    const dialogRef = this.dialog.open(DialogdeletecomponentComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._apiProducto.delete(producto.id).subscribe((response) => {
          if (response.succes == 1) {
            this.snackBar.open(response.mesage, '', {
              duration: 2000,
            });
            this.getProductos();
          }
        });
      }
    });
  }
}
