import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/models/cliente';
import { ApiclienteService } from 'src/app/services/apicliente.service';

@Component({
  selector: 'app-dialogcliente',
  templateUrl: './dialogcliente.component.html',
  styleUrls: ['./dialogcliente.component.scss']
})
export class DialogclienteComponent {

  public nombre: string;

  constructor(
    public dialogRef: MatDialogRef<DialogclienteComponent>,
    private _apiCliente: ApiclienteService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente
  ){ 
    if(this.cliente != null ){
      this.nombre = cliente.nombre;
    }
  }

  close() {
    this.dialogRef.close();
  }

  addCliente(){
    const cliente: Cliente = { nombre: this.nombre, id: 0 };
    this._apiCliente.add(cliente).subscribe(response =>{
        if(response.succes === 1){
            this.dialogRef.close();

            this.snackBar.open(response.mesage, '', {
                duration: 3000
            });
        }
    });
  }

  editCliente(){
      const cliente: Cliente = { nombre: this.nombre, id: this.cliente.id };

      this._apiCliente.edit(cliente).subscribe(response =>{
          if(response.succes == 1){
              this.dialogRef.close();

              this.snackBar.open('cliente editado con exito', '', {
                  duration: 2000
              });
          }
          


      });
  }

}
