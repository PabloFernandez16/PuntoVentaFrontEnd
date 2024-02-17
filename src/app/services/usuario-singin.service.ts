import { Injectable } from '@angular/core';
import { UsuarioSingin } from '../models/usuarioSingin';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioSinginService {

  url : string = 'https://localhost:7271/api/Usuario';
  
  constructor(private _http : HttpClient) { }

  addUsser(usser: UsuarioSingin): Observable<Response> {
    const body = JSON.stringify(usser);
    return this._http.post<Response>(`${this.url}/singin`, body, httpOption);
  }

}
