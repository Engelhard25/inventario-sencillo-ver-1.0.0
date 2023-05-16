import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { InventoryApp } from './src/inventory/inventory-app';


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Mega Limpio 2018 C.A</h1>
    <div class="card">
      
    </div>
    
  </div>
`

const element = document.querySelector('.card');

InventoryApp(element);