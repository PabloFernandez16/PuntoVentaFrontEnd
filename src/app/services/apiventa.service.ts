import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';
import { Response } from '../models/response';


const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiventaService {

  url : string = 'https://localhost:7271/api/Venta';
  
  constructor(private _http : HttpClient) { }

  /*add(venta: Venta): Observable<Response> {
    const body = JSON.stringify(venta);
    return this._http.post<Response>(this.url, body, httpOption);
  }*/
  add(venta: Venta): Observable<Response>{
    return this._http.post<Response>(this.url, venta, httpOption);
  }
  getVenta(): Observable<Response>{
    return this._http.get<Response>(this.url);
  }
  
  getCarrito(): Observable<Response> {
    return this._http.get<Response>(`${this.url}`);
  }
  
  edit(venta: Venta): Observable<Response> {
    return this._http.put<Response>(this.url, venta, httpOption);
  }
  
  delete(id:number): Observable<Response> {
    return this._http.delete<Response>(`${this.url}/${id}`);
  }
  

  
}
