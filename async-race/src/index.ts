import './style.css';
import * as WinnersPage from './pages/winners';
import * as GaragePage from './pages/garage';

GaragePage.init();

const headerNavElement = document.querySelector('.header__nav');

function togglePage(namePage: string) {
  const garagePage = document.querySelector<HTMLElement>('.garage');
  const winnerPage = document.querySelector<HTMLElement>('.winners');

  if (!garagePage || !winnerPage) {
    return;
  }

  if (namePage === 'garage') {
    garagePage.style.display = 'block';
    winnerPage.style.display = 'none';
  }

  if (namePage === 'winner') {
    garagePage.style.display = 'none';
    winnerPage.style.display = 'block';
  }
}

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
