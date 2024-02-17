import { Producto } from "./producto";

export interface DetalleCarrito {

    idDetalle : number;
    cantidad: number;
    subTotal: number
    producto: Producto;
}