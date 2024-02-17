import { Component, OnInit } from '@angular/core';
import { ApiauthService } from './services/apiauth.service';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { ApicarritoService } from './services/apicarrito.service';
import { DetalleCarrito } from './models/detalleVenta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'PuntoVenta_';
  public usuario: Usuario;
  
  constructor(
    public apiAuth: ApiauthService,
    private _router: Router,
  ){
    this.apiAuth.usuario.subscribe(res =>{
      this.usuario = res;
    });
  }
  ngOnInit(): void {
  }


  logout() {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas salir?");
    this.apiAuth.logOut();
    this._router.navigate(['login']);

    if (confirmLogout) {
      localStorage.removeItem('carrito');
    }
     
  }

  Carrito(){
    this._router.navigate(['carrito']);
  }
  getNumeroProductosEnCarrito(): number {
    const carrito: DetalleCarrito[] = JSON.parse(localStorage.getItem('carrito') || '[]');
    return carrito.reduce((total, detalle) => total + detalle.cantidad, 0);
  }
  

}
