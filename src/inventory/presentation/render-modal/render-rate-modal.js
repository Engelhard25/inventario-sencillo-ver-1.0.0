import modalHTML from './render-rate-modal.html?raw';
import './render-modal.css';
import { getRate } from '../../usecases/get-rate';


let modalRate, form;
let loadedRate;

/**
 * 
 * @param {String|Number} code 
 */
export const ShowModalRate = async (id = 1) => {

    //Si mi modal posee una clase 'hide-modal' la remuevo (muestro el modal)
    modalRate?.classList.remove('hide-modal');
    loadedRate = {};

    //si no existe el id no hago nada
    if (!id) return;
    const rate = await getRate(id);
    setFormValues(rate);
    
}

const hideModalRate = () => {
    //Si mi modal no posee la clase 'hide-modal' la agrego (Esconder Modal)
    modalRate?.classList.add('hide-modal');
    form?.reset();
    location.reload();
}

const setFormValues = (rate) => {
    form.querySelector('[name="rate"]').value = rate.rate;
    loadedRate = rate;
}

/**
 * @param {HTMLDivElement} element 
 * @param {(inventoryLike)=> Promise<void> } callback
 */
export const renderModalRate = (element, callback) => {
    //Si modal existe no hago nada
    if (modalRate) return;
    //Si no existe creo el modal
    modalRate = document.createElement('div');
    modalRate.innerHTML = modalHTML;
    modalRate.className = 'modal-container-rate hide-modal';

    form = modalRate.querySelector('form');
    //Agrego un evento click para esconder el modal
    modalRate.addEventListener('click', (event) => {
        if (event.target.className === 'modal-container-rate') {
            hideModalRate();
        }
    });
    //agrego un evento click para enviar el formulario del modal
    form.addEventListener('submit', async (event) => {
        //evito los eventos por defecto
        event.preventDefault();
        //creo un nuevo formulario con el modal
        const formData = new FormData(form);
        const rateLike = loadedRate;
        //transformo los campos stock y basePrice a numericos
        for (const [key, value] of formData) {
            if (key === 'rate') {
                rateLike[key] = Number(value);
                continue;
            }
        }
        //espero el callback del inventario y escondo el modal
        await callback(rateLike);
        hideModalRate();
    });
    //agrego el contenido html
    element.append(modalRate);
    
}

