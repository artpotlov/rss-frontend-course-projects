import { initCard} from "./modules/carousel.mjs"
import { HEADER, openCloseMenu} from "./modules/menu.mjs"

// Header mobile menu
HEADER.addEventListener('click', (event) => openCloseMenu(event))

//Pets slider
document.addEventListener('DOMContentLoaded', initCard)