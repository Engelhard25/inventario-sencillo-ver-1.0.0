import { Inventory } from "../models/inventory";

/**
 * Tomamos los Valores de la BD y creamos un nuevo inventario,
 * esto se hace en caso de que haya un cambio en el backend,
 * se toma el valor del modelo y no hace falta modificar todo
 * el programa, solo el mapper. (DB -> Inventario)
 * @param {Like<Inventory>} dbInventory 
 * @returns {Inventory}
 */
export const dbInventoryToModel = ( dbInventory ) => {
    const {
        id,
        code,
        description,
        stock,
        base_price,
    } = dbInventory;

    return new Inventory ({
        id,
        code,
        description,
        stock,
        basePrice: base_price,
    });

}