import { ShowModalRate } from '../render-modal/render-rate-modal';
import './render-rate-button.css';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderRateButton = (element) => {
    //Creo un Botón
    const addButton = document.createElement('Button');
    //Agrego el Texto del botón
    addButton.innerText = 'Cambiar Tasa Bs';
    //Agrego la clase fab-button la cual sera usada para identificar el botón
    addButton.classList.add('fab-button-rate');
    //Inserto el HTML
    element.append(addButton);

    addButton.addEventListener('click', () => {
        ShowModalRate();
    });
}