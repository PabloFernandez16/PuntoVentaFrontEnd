import { Component, OnInit } from '@angular/core';
import { ApiauthService } from '../services/apiauth.service';
import { Response } from '../models/response';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  errorMessage: string | null = null;
  
  errorClass: string;

  public loginForm = this._formBilder.group({
    email: ['', Validators.required],
    pass: ['',  Validators.required ]
  });


  constructor( 
    public apiAuth: ApiauthService,
    private _router: Router,
    private _formBilder: FormBuilder
  ){
    if(this.apiAuth.usuarioData){
      this._router.navigate(['/']);
    }
  }

  ngOnInit() {

  }

  login() {
    const loginData: Login = {
      email: this.loginForm.get('email')?.value,
      pass: this.loginForm.get('pass')?.value
    };
  
    this.apiAuth.login(loginData).subscribe(response => {
      if (response.succes === 1) {
        this._router.navigate(['/']);
      }
    },
    error => {
      console.error(error);
      this.errorMessage = "Usuario o contraseña incorrectos.";
      this.errorClass = "error";
    }
    );
  }
  
}
