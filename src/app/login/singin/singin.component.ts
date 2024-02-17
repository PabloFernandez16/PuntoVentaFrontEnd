import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioSinginService } from 'src/app/services/usuario-singin.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss']
})
export class SinginComponent {

  registroForm: FormGroup;
  errorMessage: string = '';
  errorClass: string = '';

  constructor(private formBuilder: FormBuilder, private usuarioSinginService: UsuarioSinginService, private router: Router, private _snackBar: MatSnackBar) {
    
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required/*, Validators.minLength(6)*/]],
    });
  }

  registrarse() {
    if (this.registroForm.invalid) {
      return;
    }

    const usuarioSingin = {
      nombre: this.registroForm.get('nombre').value,
      email: this.registroForm.get('email').value,
      pass: this.registroForm.get('pass').value,
    };

    this.usuarioSinginService.addUsser(usuarioSingin)
      .subscribe(
        (respuesta: any) => {

          this.router.navigate(['/login']);
          this._snackBar.open('Registro exitoso', '', {
            duration: 2000,
          });
        },
        (error: any) => {
          console.error('Error en el registro:', error);
          this.errorMessage = 'Error en el registro. Por favor, verifica tus datos.';
          this.errorClass = 'error';
        }
      );
  }
  
}
