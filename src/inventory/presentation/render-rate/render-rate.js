import { getRate } from "../../usecases/get-rate";
import "./render-rate.css"

const rateValue = await getRate(1);

export const currentRate = (element) =>  {
    // Crea un nuevo elemento <span>
    const renderRate = document.createElement('span');
           renderRate.className = 'span-current-rate'            
    // Agrega el texto proporcionado como contenido del elemento <span>
    renderRate.innerText = `Tasa Actual: ${rateValue.rate} Bs`;
    
    element.append(renderRate);
  }