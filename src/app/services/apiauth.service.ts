import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../models/response';
import { Usuario } from '../models/usuario';
import { map} from 'rxjs/operators';
import { Login } from '../models/login';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ApiauthService {

  url: string = 'https://localhost:7271/api/Usuario/login';

  private usuarioSubject: BehaviorSubject<Usuario>;
  public usuario: Observable<Usuario>;

  public get usuarioData () : Usuario{
    return this.usuarioSubject.value;
  }

  constructor(private _http : HttpClient) {
    this.usuarioSubject = 
      new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));
      this.usuario = this.usuarioSubject.asObservable();
  }

  addProducto(producto: Usuario): Observable<Response> {
    const body = JSON.stringify(producto);
    return this._http.post<Response>(`${this.url}/singin`, body, httpOption);
  }

  //login(email: string, pass: string): Observable<Response>{
  login(login: Login): Observable<Response>{

    return this._http.post<Response>(this.url, login, httpOption).pipe(
      map(res => {
        if(res.succes === 1 ){
          const usuario : Usuario = res.data;
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.usuarioSubject.next(usuario);
        }
        return res;
      })
      )
  }

  logOut(){
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }
}


