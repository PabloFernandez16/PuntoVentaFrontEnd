import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './login/login.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProductoCarritoComponent } from './producto/producto-carrito/producto-carrito.component';
import { DialogdeletecomponentComponent } from './common/delete/dialogdeletecomponent.component';
import { VentaComponent } from './venta/venta.component';
import { SinginComponent } from './login/singin/singin.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'producto', component: ProductoComponent, canActivate: [AuthGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'venta', component: VentaComponent, canActivate: [AuthGuard] },
  { path: 'producto-carrito/:idProducto', component: ProductoCarritoComponent, canActivate: [AuthGuard] },
  { path: 'dialogdeletecomponent', component: DialogdeletecomponentComponent, canActivate: [AuthGuard] },




  { path: 'login', component: LoginComponent },
  { path: 'singin', component: SinginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
