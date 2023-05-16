import { Inventory } from "../models/inventory";
import { loadInventoryByPage } from "../usecases/load-inventory";


//? Control de pagina (Vista)
const state = {
    currentPage: 0,
    inventorys: [],
}

//? Carga la pagina siguiente (Vista)
const loadNextPage = async () => {
    const inventorys = await loadInventoryByPage(state.currentPage+1);
    if (inventorys.length === 0) return;

    state.currentPage += 1;
    state.inventorys = inventorys;
}

const loadPrevPage = async () => {
    if (state.currentPage === 1) return;
    const inventorys = await loadInventoryByPage(state.currentPage-1);
    state.inventorys = inventorys;
    state.currentPage -= 1;
}

/**
 * 
 * @param {Inventory} updatedInventory 
 */
const onInventorychanged = (updatedInventory) => {
    location.reload();
    let wasFound = false;

    state.inventorys = state.inventorys.map (inventory => {
        if (inventory.code === updatedInventory.code) {
            wasFound = true;
            return updatedInventory;
        }
    });

    if (state.inventorys.length <10 && !wasFound) {
        state.inventorys.push(updatedInventory);
    }
    
}

const reloadPage = async () => {
    const inventorys = await loadInventoryByPage(state.currentPage);
    if (inventorys.length === 0) {
        await loadPrevPage();
        return;
    };
    state.inventorys = inventorys;
}


export default {
    loadNextPage,
    loadPrevPage,
    onInventorychanged,
    reloadPage,

     /**
     * 
     * @returns {Inventory[]}
     */
     getInventory: () => [...state.inventorys],

     /**
     * 
     * @returns {Inventory[]}
     */
    getCurrentPage: () => state.currentPage,
}