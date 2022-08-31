import { Order, Sort } from '../types/types';
import * as UI from '../ui/ui';
import * as API from '../utils/api';
import * as View from '../utils/view';

const winnerStore = {
  currentPage: 1,
  totalPages: 1,
  totalWinners: 0,
  sort: {
    field: <Sort>'time',
    type: <Order>'ASC',
  },
};

function updateTableHeadView(column: string) {
  const winsHeadElement = document.querySelector('[data-role="thead-wins"]');
  const timeHeadElement = document.querySelector('[data-role="thead-time"]');

  if (!winsHeadElement || !timeHeadElement) {
    return;
  }

  if (column === 'wins') {
    if (winnerStore.sort.type === 'ASC') {
      winsHeadElement.textContent = 'Wins ↑';
    } else {
      winsHeadElement.textContent = 'Wins ↓';
    }

    timeHeadElement.textContent = 'Best time (seconds)';
  }

  if (column === 'time') {
    if (winnerStore.sort.type === 'ASC') {
      timeHeadElement.textContent = 'Best time (seconds) ↑';
    } else {
      timeHeadElement.textContent = 'Best time (seconds) ↓';
    }

    winsHeadElement.textContent = 'Wins';
  }
}

async function clickTheadWins() {
  const tableElement = document.querySelector<HTMLTableElement>('.winners__table');

  if (!tableElement) {
    return;
  }

  winnerStore.sort.field = 'wins';
  winnerStore.sort.type = winnerStore.sort.type === 'ASC' ? 'DESC' : 'ASC';

  const response = await API.getWinners(
    winnerStore.currentPage,
    winnerStore.sort.field,
    winnerStore.sort.type,
  );

  if (!response) return;

  tableElement.innerHTML = '';

  View.drawUpdate(UI.getWinnersTemplate(response.winners), tableElement);
  updateTableHeadView('wins');
}

async function clickTheadTime() {
  const tableElement = document.querySelector<HTMLTableElement>('.winners__table');

  if (!tableElement) {
    return;
  }

  winnerStore.sort.field = 'time';
  winnerStore.sort.type = winnerStore.sort.type === 'ASC' ? 'DESC' : 'ASC';

  const response = await API.getWinners(
    winnerStore.currentPage,
    winnerStore.sort.field,
    winnerStore.sort.type,
  );

  if (!response) return;

  tableElement.innerHTML = '';

  View.drawUpdate(UI.getWinnersTemplate(response.winners), tableElement);
  updateTableHeadView('time');
}

function tableEvent() {
  const tableElement = document.querySelector<HTMLTableElement>('.winners__table');
  const tableHeadElement = document.querySelector('.winners__head');

  if (!tableElement || !tableHeadElement) {
    return;
  }

  tableHeadElement.addEventListener('click', async ({ target }) => {
    if (target instanceof HTMLElement) {
      if (target.dataset.role === 'thead-wins') {
        await clickTheadWins();
      }

      if (target.dataset.role === 'thead-time') {
        await clickTheadTime();
      }

      tableEvent();
    }
  });
}

function updatePaginationWinnerView() {
  const winnersElement = document.querySelector<HTMLElement>('.winners');

  if (!winnersElement) {
    return;
  }

  const paginationElement = winnersElement.querySelector<HTMLElement>(
    '[data-role="pagination-winners"]',
  );

  if (!paginationElement) {
    return;
  }

  const prevButton = paginationElement.querySelector<HTMLButtonElement>(
    '[data-role=button-pagination-prev]',
  );
  const nextButton = paginationElement.querySelector<HTMLButtonElement>(
    '[data-role=button-pagination-next]',
  );

  const currentPageElement = winnersElement.querySelector('[data-role="header-current-page"]');

  if (!prevButton || !nextButton || !currentPageElement) {
    return;
  }

  if (winnerStore.currentPage === 1) {
    prevButton.disabled = true;
    nextButton.disabled = false;
  }

  if (winnerStore.currentPage === winnerStore.totalPages && winnerStore.totalPages > 1) {
    prevButton.disabled = false;
    nextButton.disabled = true;
  }

  if (winnerStore.currentPage === winnerStore.totalPages && winnerStore.totalPages === 1) {
    prevButton.disabled = true;
    nextButton.disabled = true;
  }

  if (winnerStore.currentPage > 1 && winnerStore.currentPage < winnerStore.totalPages) {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }

  if (winnerStore.totalWinners === 0) {
    prevButton.disabled = true;
    nextButton.disabled = true;
  }

  currentPageElement.textContent = `Page #${winnerStore.currentPage}`;
}

async function clickBtnPrev() {
  winnerStore.currentPage -= 1;

  const response = await API.getWinners(winnerStore.currentPage);

  if (!response) return;

  const tableElement = document.querySelector<HTMLTableElement>('.winners__table');

  if (!tableElement) {
    return;
  }

  tableElement.innerHTML = '';

  View.drawUpdate(UI.getWinnersTemplate(response.winners), tableElement);
  updatePaginationWinnerView();
  tableEvent();
}

async function clickBtnNext() {
  winnerStore.currentPage += 1;

  const response = await API.getWinners(winnerStore.currentPage);

  if (!response) return;

  const tableElement = document.querySelector<HTMLTableElement>('.winners__table');

  if (!tableElement) {
    return;
  }

  tableElement.innerHTML = '';

  View.drawUpdate(UI.getWinnersTemplate(response.winners), tableElement);
  updatePaginationWinnerView();
  tableEvent();
}

function paginationEvent() {
  const paginationElement = document.querySelector<HTMLElement>('[data-role="pagination-winners"]');

  paginationElement?.addEventListener('click', ({ target }) => {
    if (target instanceof HTMLButtonElement) {
      if (target.dataset.role === 'button-pagination-prev') {
        clickBtnPrev();
      }

      if (target.dataset.role === 'button-pagination-next') {
        clickBtnNext();
      }
    }
  });
}

function initWinnersEvents() {
  paginationEvent();
  tableEvent();
}

export async function init() {
  const winnerElement = document.querySelector<HTMLElement>('.winners');

  if (!winnerElement) {
    return;
  }

  winnerElement.innerHTML = '';

  const response = await API.getWinners(winnerStore.currentPage);

  if (!response) return;

  winnerStore.totalWinners = response.totalWinners;
  winnerStore.totalPages =
    winnerStore.totalWinners % 10 === 0
      ? winnerStore.totalWinners / 10
      : Math.trunc(winnerStore.totalWinners / 10) + 1;

  View.draw(
    UI.getHeadersWinnersTemplate(winnerStore.currentPage, winnerStore.totalWinners),
    winnerElement,
  );

  View.draw(UI.getWinnersTemplate(response.winners), winnerElement);
  View.draw(UI.getPaginationTemplate('pagination-winners'), winnerElement);

  updatePaginationWinnerView();
  initWinnersEvents();
}
