import { Inventory } from "../models/inventory"
import { dbModelToInventory } from "../mappers/inventory-to-db.mapper";
import { dbInventoryToModel } from "../mappers/db-to-inventory.mapper";

/**
 * 
 * @param {like<Inventory>} inventoryLike 
 */
export const saveInventory = async (inventoryLike) => {
    const inventory = new Inventory (inventoryLike);
    if (!inventory.description) 
    throw 'Descripción es requerida';

    const inventoryToSave = dbModelToInventory(inventory);
    let inventoryUpdated;

    if (inventory.id) {
        inventoryUpdated = await updateInventory(inventoryToSave);
    } else {
        inventoryUpdated = await createInventory(inventoryToSave);
    }

    return dbInventoryToModel(inventoryUpdated);
}

/**
 * 
 * @param {Like<Inventory>} inventory 
 * 
 */
const createInventory = async (inventory) => {

    const url = `${import.meta.env.VITE_BASE_URL}/inventory`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(inventory),
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    const newInventory = await res.json();
    return newInventory;
}

/**
 * 
 * @param {like<Inventory>} inventory 
 */
const updateInventory = async (inventory) => {

    const url = `${import.meta.env.VITE_BASE_URL}/inventory/${inventory.id}`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(inventory),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updateInventory = await res.json();
    return updateInventory;
}