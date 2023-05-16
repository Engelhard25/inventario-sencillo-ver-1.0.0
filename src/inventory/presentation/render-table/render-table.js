import inventoryStore from "../../store/inventory-store";
import { deleteInventoryById } from "../../usecases/delete-inventory-by-id";
import { getRate } from "../../usecases/get-rate";
import { ShowModal } from "../render-modal/render-modal";
import "./render-table.css";

let table;
const rate = await getRate(1);

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML= `
        <tr>
            <th> ID </th>
            <th> Codigo </th>
            <th> Descripcion </th>
            <th> Cantidad Disponible </th>
            <th> Precio Divisas </th>
            <th> Precio Bolivares </th>
            <th> Disponible </th>
        </tr>
    `;
    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody)
    return table;
}

/**
 * @param {MouseEvent} event 
 */
const tableSelectListener = (event) => {
    const element = event.target.closest('.select-inventory');
    if (!element) return;

    const id = element.getAttribute('data-id');
    ShowModal(id);
} 

/**
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async (event) => {
    const element = event.target.closest('.delete-inventory');
    if (!element) return;

    const id = element.getAttribute('data-id');
    try {
        await deleteInventoryById(id);
        await inventoryStore.reloadPage();
        document.querySelector('#current-page').innerText = inventoryStore.getCurrentPage();
        renderTable();
    } catch (error) {
        alert ('No se pudo eliminar');
    }
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {
    const inventorys = inventoryStore.getInventory();
    if (!table) {
        table = createTable();
        element.append(table);

        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);
    }

    let tableHTML = '';
    inventorys.forEach( inventory => {
        if (!inventory || !inventory.id) return;
        tableHTML += `
        <tr>
            <td>${inventory.id}</td>
            <td>${inventory.code}</td>
            <td>${inventory.description}</td>
            <td>${inventory.stock}</td>
            <td>${inventory.basePrice} $</td>
            <td>${inventory.basePrice * rate.rate} bs</td>
            <td>${inventory.stock > 1 ? 'Disponible' : 'No Disponible'} </td>
            <td>
                <a href="#/" class="select-inventory" data-id="${inventory.id}">Modificar</a>
                |
                <a href="#/" class="delete-inventory" data-id="${inventory.id}">Borrar</a>
            </td>
        </tr>
        `;
    });

    table.querySelector('tbody').innerHTML = tableHTML;
    

}