import './style.css';
import * as WinnersPage from './pages/winners';
import * as GaragePage from './pages/garage';
import { togglePage } from './pages/toggle-page';

GaragePage.init();

const headerNavElement = document.querySelector('.header__nav');

if (headerNavElement) {
  headerNavElement.addEventListener('click', ({ target }) => {
    if (target instanceof HTMLButtonElement) {
      if (target.dataset.role === 'page-garage') {
        togglePage('garage');
      }
      if (target.dataset.role === 'page-winners') {
        togglePage('winner');
        WinnersPage.init();
      }
    }
  });
}
