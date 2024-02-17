import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ProductoComponent } from './producto/producto.component';
import { LoginComponent } from './login/login.component';


import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MatButtonModule} from '@angular/material/button';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './security/jwt.interceptor';
import { CarritoComponent } from './carrito/carrito.component';
import { DialogproductoComponent } from './producto/dialogproducto/dialogproducto.component';
import { MatSelectModule } from '@angular/material/select';
import { ClienteComponent } from './cliente/cliente.component';
import { DialogclienteComponent } from './cliente/dialogcliente/dialogcliente.component';
import { ProductoCarritoComponent } from './producto/producto-carrito/producto-carrito.component';
import { DialogdeletecomponentComponent } from './common/delete/dialogdeletecomponent.component';
import { VentaComponent } from './venta/venta.component';
import { SinginComponent } from './login/singin/singin.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    HomeComponent,
    LoginComponent,
    CarritoComponent,
    DialogproductoComponent,
    ClienteComponent,
    DialogclienteComponent,
    ProductoCarritoComponent,
    DialogdeletecomponentComponent,
    VentaComponent,
    SinginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    

    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,

    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule

    

    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
