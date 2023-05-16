import inventoryStore from "../../store/inventory-store";
import { renderTable } from "../render-table/render-table";
import './render-buttons.css';


export const renderButtons = (element) => {
    //Crea un elemento HTML de tipo Botón
    const nextButton = document.createElement('button');
    //Crea el contenido del elemento Botón
    nextButton.innerText = ' Siguiente >';

    const prevButton = document.createElement('button');
    prevButton.innerText = '< Anterior ';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    //Se toma la pagina actual y se crea el contenido del Botón 
    currentPageLabel.innerText = inventoryStore.getCurrentPage();

    //Se inyecta el codigo al HTML para ser mostrado en pantalla
    element.append(prevButton, currentPageLabel, nextButton);

    //Agregamos un evento al botón siguiente/Anterior, cuando se haga click
    //recarga la pagina y cambia el contenido de la página actual
    nextButton.addEventListener('click', async () => {
        await inventoryStore.loadNextPage();
        currentPageLabel.innerText = inventoryStore.getCurrentPage();
        renderTable(element);
    });

    prevButton.addEventListener('click', async () => {
        await inventoryStore.loadPrevPage();
        currentPageLabel.innerText = inventoryStore.getCurrentPage();
        renderTable(element);
    })
}