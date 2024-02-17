import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//4, agregar el response de la interfece creeada
import { Response } from '../models/response'
import { Producto } from '../models/producto';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApiProductoService {

  url: string = 'https://localhost:7271/api/Producto';

  constructor(private _http : HttpClient) { }

  createProd(producto: Producto): Observable<Response>{
    const formData = new FormData();
    formData.append('descripcion', producto.descripcion);
    formData.append('precioVenta', producto.precioVenta.toString());
    formData.append('precioCompra', producto.precioCompra.toString());
    formData.append('cantidadStock', producto.cantidadStock.toString());
    //formData.append('imagenFile', producto.imagen);

    return this._http.post<Response>(this.url, formData);

  }
  getProductById(id: number): Observable<Response> {
    const urlWithId = `${this.url}/GetById/${id}`; 
    return this._http.get<Response>(urlWithId);
  }

  getProductos(): Observable<Response>{
    return this._http.get<Response>(this.url);
  }

  add(producto: Producto): Observable<Response> {
    const body = JSON.stringify(producto);
    return this._http.post<Response>(this.url, body, httpOption);
  }
  
  edit(producto: Producto): Observable<Response> {
    return this._http.put<Response>(this.url, producto, httpOption);
  }

  delete(id:number): Observable<Response> {
    return this._http.delete<Response>(`${this.url}/${id}`);
  }

  editCantidadProductoEnDB(id: number, cantidad: number): Observable<Response> {
    const url = `${this.url}/${id}/${cantidad}`;
    return this._http.put<Response>(url, null, httpOption);
  }
}
