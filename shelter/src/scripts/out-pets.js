import { HEADER, openCloseMenu } from "./modules/menu.mjs";
import { initCards } from "./modules/our-pet-cards.mjs";
import { CARDS, popUp } from './modules/popup.mjs'

HEADER.addEventListener('click', (event) => openCloseMenu(event))

document.addEventListener('DOMContentLoaded', initCards)

CARDS.addEventListener('click', popUp)