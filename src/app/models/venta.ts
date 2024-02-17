import { Carrito } from "./carrito";
import { Cliente } from "./cliente";
import { DetalleCarrito } from "./detalleVenta";

export interface Venta {
    id: number;
    total: number;
    cliente: Cliente;
    //carrito : Carrito;
}