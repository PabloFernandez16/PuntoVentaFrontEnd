
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from "rxjs";
import { ApiauthService } from "../services/apiauth.service";

@Injectable({providedIn: 'root'} )

export class AuthGuard implements CanActivate{
    
    constructor( private _router: Router, private _apiAuth: ApiauthService){}

    canActivate (route: ActivatedRouteSnapshot, ) {
        const usuario = this._apiAuth.usuarioData;
        if(usuario){
            return true;
        }
        this._router.navigate(['login']);
        return false;
    }
}