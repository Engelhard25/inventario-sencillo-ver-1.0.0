import { ShowModal } from '../render-modal/render-modal';
import './render-add-button.css';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderAddButton = (element) => {
    //Creo un Botón
    const addButton = document.createElement('Button');
    //Agrego el Texto del botón
    addButton.innerText = 'Cambiar Tasa';
    //Agrego la clase fab-button la cual sera usada para identificar el botón
    addButton.classList.add('fab-button');
    //Inserto el HTML
    element.append(addButton);

    addButton.addEventListener('click', () => {
        ShowModal();
    });
}