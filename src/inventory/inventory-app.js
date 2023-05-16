import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { renderModal } from "./presentation/render-modal/render-modal";
import { renderModalRate } from "./presentation/render-modal/render-rate-modal";
import { renderRateButton } from "./presentation/render-rate-button/render-rate-button";
import { currentRate } from "./presentation/render-rate/render-rate";
import { renderTable } from "./presentation/render-table/render-table";
import inventoryStore from "./store/inventory-store";
import { saveInventory } from "./usecases/save-inventory";
import { updateRate } from "./usecases/save-rate";

/**
 * 
 * @param {HTMLDivElement} Element 
 */
export const InventoryApp = async (element) => {
    element.innerHTML = 'Loading...';
    await inventoryStore.loadNextPage();
    element.innerHTML = '';

    currentRate(element);
    renderTable(element);
    renderButtons(element);
    renderAddButton(element);
    renderRateButton(element);
    renderModal(element, async (inventoryLike) => {
        const inventory = await saveInventory(inventoryLike);
        inventoryStore.onInventorychanged(inventory);
        renderTable();
    });
    renderModalRate(element, async (rateLike) => {
        const rate = await updateRate(rateLike);
        renderTable();
    });

}