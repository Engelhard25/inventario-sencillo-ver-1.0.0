import modalHTML from './render-modal.html?raw';
import { Inventory } from '../../models/inventory';
import { getInventoryByid } from '../../usecases/get-inventory-by-code';

import './render-modal.css';


let modal, form;
let loadedInventory = {};

/**
 * 
 * @param {String|Number} code 
 */
export const ShowModal = async (id) => {

    //Si mi modal posee una clase 'hide-modal' la remuevo (muestro el modal)
    modal?.classList.remove('hide-modal');
    loadedInventory = {};

    //si no existe el id no hago nada
    if (!id) return;
    const inventory = await getInventoryByid(id);
    setFormValues(inventory);
    
}

export const hideModal = () => {
    //Si mi modal no posee la clase 'hide-modal' la agrego (Esconder Modal)
    modal?.classList.add('hide-modal');
    form?.reset();
}



/**
 * Agrego los valores al modal
 * @param {Inventory} inventory 
 */
const setFormValues = (inventory) => {
    form.querySelector('[name="code"]').value = inventory.code;
    form.querySelector('[name="description"]').value = inventory.description;
    form.querySelector('[name="stock"]').value = inventory.stock;
    form.querySelector('[name="basePrice"]').value = inventory.basePrice;
    loadedInventory = inventory;
}

/**
 * @param {HTMLDivElement} element 
 * @param {(inventoryLike)=> Promise<void> } callback
 */
export const renderModal = (element, callback) => {
    //Si modal existe no hago nada
    if (modal) return;
    //Si no existe creo el modal
    modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    modal.className = 'modal-container hide-modal';

    form = modal.querySelector('form');
    //Agrego un evento click para esconder el modal
    modal.addEventListener('click', (event) => {
        if (event.target.className === 'modal-container') {
            hideModal();
        }
    });
    //agrego un evento click para enviar el formulario del modal
    form.addEventListener('submit', async (event) => {
        //evito los eventos por defecto
        event.preventDefault();
        //creo un nuevo formulario con el modal
        const formData = new FormData(form);
        const inventoryLike = {...loadedInventory};

        //transformo los campos stock y basePrice a numericos
        for (const [key, value] of formData) {
            if (key === 'code') {
                inventoryLike[key] = Number(value);
                continue;
            }
            if (key === 'stock') {
                inventoryLike[key] = Number(value);
                continue;
            }
            if (key === 'basePrice') {
                inventoryLike[key] = Number(value);
                continue;
            }
            inventoryLike[key] = value;
        }
        //espero el callback del inventario y escondo el modal
        await callback(inventoryLike);
        hideModal();
       
    });
    //agrego el contenido html
    element.append(modal);
    
}

