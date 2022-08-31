import * as WinnersPage from './winners';

export function togglePage(namePage: string) {
  const garagePage = document.querySelector<HTMLElement>('.garage');
  const winnerPage = document.querySelector<HTMLElement>('.winners');

  if (!garagePage || !winnerPage) {
    return;
  }

  if (namePage === 'page-garage') {
    garagePage.style.display = 'block';
    winnerPage.style.display = 'none';
  }

  if (namePage === 'page-winner') {
    garagePage.style.display = 'none';
    winnerPage.style.display = 'block';

    WinnersPage.init();
  }
}