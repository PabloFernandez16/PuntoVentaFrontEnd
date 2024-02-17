import { Component, OnInit, Renderer2 } from '@angular/core';
import { ApiProductoService } from '../services/api-producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApicarritoService } from '../services/apicarrito.service';
import { Router } from '@angular/router';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  lista: Producto[] = [];
  listFiltrada : Producto[] = [];
  producto: Producto;
    public cantidad: number ;
    public idProducto: number;

    nombreProductoBuscado: string = '';

  constructor(public snackBar: MatSnackBar, private _apiProducto: ApiProductoService, private _apiCarrito: ApicarritoService,
    private _router: Router, private renderer: Renderer2
    
  ) {}
  
  ngOnInit(): void {
    this.getProductos();
    this.renderer.selectRootElement('#nombreProductoInput').focus();
    
  }

  buscarPorNombre() {
    this.listFiltrada = this.lista.filter(
      (producto) =>
        producto.nombre.toLowerCase().startsWith(this.nombreProductoBuscado.toLowerCase())
    );
  }

  restaurarListaOriginal() {
    this.listFiltrada = this.lista;
  }

  getProductoById(id: number) {
    this._apiProducto.getProductById(id).subscribe((response) => {
      
      this.producto =  response.data;
    });
  }

  getProductos(){
    this._apiProducto.getProductos().subscribe( response=>{
      this.lista = response.data;
      this.listFiltrada = this.lista;
    });
  }

  detalles(idProducto: number) {
    this.idProducto = idProducto;
    this.getProductoById(idProducto);
    this._router.navigate(['producto-carrito', idProducto]);

  }

  
}
