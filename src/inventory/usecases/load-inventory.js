import { dbInventoryToModel } from "../mappers/db-to-inventory.mapper";
import { Inventory } from "../models/inventory";

/**
 * 
 * @param {Number} page
 * @returns {Promise<Inventory[]>}
 */
export const loadInventoryByPage = async (page = 1) =>{
    const url = `${import.meta.env.VITE_BASE_URL}/inventory?_page=${page}`;
    const res = await fetch(url);
    const data = await res.json();

    const inventory =  data.map(dbInventoryToModel);

    return inventory; 
}

