import { initCard} from "./modules/carousel.mjs"
import { HEADER, openCloseMenu} from "./modules/menu.mjs"
import { CARDS, popUp } from './modules/popup.mjs'
// Header mobile menu
HEADER.addEventListener('click', (event) => openCloseMenu(event))

//Pets slider
document.addEventListener('DOMContentLoaded', initCard)

//Pop Up pet cards
CARDS.addEventListener('click', popUp)