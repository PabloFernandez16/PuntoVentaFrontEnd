import { DetalleCarrito } from "./detalleVenta";

export interface Carrito {
    total: number
    detallesCarrito: DetalleCarrito[];

}