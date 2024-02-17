import { Component } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Response } from '../models/response';
import { DialogclienteComponent } from './dialogcliente/dialogcliente.component';
import { Cliente } from '../models/cliente';
import { DialogdeletecomponentComponent } from '../common/delete/dialogdeletecomponent.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  public lst: any[];
  public columnas: string[] = ['id', 'nombre', 'actions'];
  readonly ancho: string = '300px';

  constructor(
      private apiCliente: ApiclienteService,
      public dialog: MatDialog,
      public snackBar: MatSnackBar
  ) { 
    
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
    this.apiCliente.getCliente().subscribe(response => {
      this.lst = response.data;
    });
  }

  openDialogAdd(){
    const dialogRef = this.dialog.open(DialogclienteComponent, {
      width: this.ancho
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }
  openEdit(cliente: Cliente){
    const dialogRef = this.dialog.open(DialogclienteComponent, {
      width: this.ancho,
      data: cliente
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }

  delete(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogdeletecomponentComponent, {
      width: this.ancho
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiCliente.delete(cliente.id).subscribe(response =>{
          if(response.succes == 1){
            
            this.snackBar.open('Cliente Elimiando', '',{
              duration: 2000
            })
            this.getClientes();
          }
        });
      }
    });
  }
}
