export function togglePage(namePage: string) {
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