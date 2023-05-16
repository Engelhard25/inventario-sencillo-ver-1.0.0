import { dbtoRate } from "../mappers/rate-to-db";
import { Inventory } from "../models/inventory";

/**
 * 
 * @param {String|Number} code 
 * @returns {Promise<Inventory>}
 */
export const getRate = async (id) => {

    /* Creo una constante llamada url la cual contiene la url base,
    de mi variable alamacenada en el env, y la concatena con
    el codigo recibido de mi peticion */
    const url= `${import.meta.env.VITE_BASE_URL2}/rate/${id}`;

    /* Realiza una petición HTTP GET a la url definida 
    y espera a que se resuelva la promesa */
    const res = await fetch(url);

    /* Lee la respuesta del servidor como un objeto JSON 
    utilizando el método .json() y espera a que se resuelva la promesa */
    const data = await res.json();

    /* Crea una constante inventory que almacena un objeto transformado utilizando la función dbInventoryToModel que toma el objeto data como parámetro. */
    const rate = dbtoRate(data);
    return rate;
}