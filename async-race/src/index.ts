import './style.css';
import * as GaragePage from './pages/garage';
import { togglePage } from './pages/toggle-page';

GaragePage.init();

const headerNavElement = document.querySelector('.header__nav');

if (headerNavElement) {
  headerNavElement.addEventListener('click', ({ target }) => {
    if (target instanceof HTMLButtonElement && target.dataset.role) {
      togglePage(target.dataset.role);
    }
  });
}
