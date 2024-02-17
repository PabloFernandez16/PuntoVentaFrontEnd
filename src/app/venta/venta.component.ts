
import { Component, OnInit } from '@angular/core';
import { ApiventaService } from '../services/apiventa.service';
import { Venta } from '../models/venta';
import { Cliente } from '../models/cliente';
import { ApiclienteService } from '../services/apicliente.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  public lst: Venta[];
  public listaFiltrada: Venta[];

  public originalLst: any[];  // Mantén una copia original de los datos
  clienteBuscado: string;

  public columnas: string[] = ['id', 'Total','Nombre' ,'IdCliente', 'actions'];

  constructor(private _apiVenta: ApiventaService, private _apiCli: ApiclienteService) {}

  ngOnInit(): void {
    this.getVentas();

  }

  
  getVentas() {

    this._apiVenta.getVenta().subscribe(response => {
      this.lst = response.data;
      this.listaFiltrada = this.lst;

    });


  }

  buscarPorCliente() {
    // Verifica si el valor es un número
    if (!isNaN(Number(this.clienteBuscado))) {
      this.listaFiltrada = this.lst.filter(
        (venta) => venta.cliente.id.toString().startsWith(this.clienteBuscado)
      );
    } else {
      // Si no es un número, asume que es una cadena y busca por nombre de cliente
      this.listaFiltrada = this.lst.filter(
        (venta) =>
          venta.id.toString().toLowerCase().startsWith(this.clienteBuscado.toLowerCase())
      );
    }
  }
  restaurarListaOriginal() {
    this.listaFiltrada = this.lst;
  }
  
  delete(venta: Venta) {
    alert('programar inactivacion');
  }
  
  openEdit(venta: Venta) {
    alert('programar editado');
  }
}

