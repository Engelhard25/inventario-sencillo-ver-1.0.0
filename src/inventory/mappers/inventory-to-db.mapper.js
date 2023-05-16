import { Inventory } from "../models/inventory";

/**
 * Tomamos los Valores de la BD y creamos un nuevo inventario,
 * esto se hace en caso de que haya un cambio en el backend,
 * se toma el valor del modelo y no hace falta modificar todo
 * el programa, solo el mapper. (Inventario -> BD)
 * @param {Inventory} inventory
 */
export const dbModelToInventory = ( Inventorydb ) => {
    const {
        id,
        code,
        description,
        stock,
        basePrice,
    } = Inventorydb;

    return {
        id,
        code,
        description,
        stock,
        base_price: basePrice,
    }

}