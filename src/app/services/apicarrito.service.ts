import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Response } from '../models/response'
import { Carrito } from '../models/carrito';
import { DetalleCarrito } from '../models/detalleVenta';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApicarritoService {

  url : string = 'https://localhost:7271/api/Carrito';
  

  constructor(private _http : HttpClient) { }

  

  add(detalleCarrito: DetalleCarrito) {
    localStorage.setItem('carrito', JSON.stringify(detalleCarrito) );
  }
  
  
  
  getCarrito(): Observable<Response> {
    return this._http.get<Response>(`${this.url}`);
  }
  edit(carrito: Carrito): Observable<Response> {
    return this._http.put<Response>(this.url, carrito, httpOption);
  }
  
  delete(id:number): Observable<Response> {
    return this._http.delete<Response>(`${this.url}/${id}`);
  }

  getCarritoById(id: number): Observable<Response> {
    const urlWithId = `${this.url}/GetById/${id}`; 
    return this._http.get<Response>(urlWithId);
  }



  addCarritoDB(carrito: DetalleCarrito): Observable<Response> {
    const body = JSON.stringify(carrito);
    return this._http.post<Response>(this.url, body, httpOption);
  }
  /*
  getCarrito(): Observable<Response> {
    return this._http.get<Response>(`${this.url}`);
  }
  edit(carrito: Carrito): Observable<Response> {
    return this._http.put<Response>(this.url, carrito, httpOption);
  }
  
  delete(id:number): Observable<Response> {
    return this._http.delete<Response>(`${this.url}/${id}`);
  }

  getCarritoById(id: number): Observable<Response> {
    const urlWithId = `${this.url}/GetById/${id}`; 
    return this._http.get<Response>(urlWithId);
  }*/

}
