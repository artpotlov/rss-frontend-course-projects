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

function tableEvent() {
  const tableElement = document.querySelector<HTMLTableElement>('.winners__table');
  const tableHeadElement = document.querySelector('.winners__head');

  if (!tableElement || !tableHeadElement) {
    return;
  }

  tableHeadElement.addEventListener('click', async ({ target }) => {
    if (target instanceof HTMLElement) {
      if (target.dataset.role === 'thead-wins') {
        winnerStore.sort.field = 'wins';
        winnerStore.sort.type = winnerStore.sort.type === 'ASC' ? 'DESC' : 'ASC';
        const response = await API.getWinners(
          winnerStore.currentPage,
          winnerStore.sort.field,
          winnerStore.sort.type,
        );
        tableElement.innerHTML = '';
        View.drawUpdate(UI.getWinnersTemplate(response.winners), tableElement);
      }

      if (target.dataset.role === 'thead-time') {
        winnerStore.sort.field = 'time';
        winnerStore.sort.type = winnerStore.sort.type === 'ASC' ? 'DESC' : 'ASC';
        const response = await API.getWinners(
          winnerStore.currentPage,
          winnerStore.sort.field,
          winnerStore.sort.type,
        );
        tableElement.innerHTML = '';
        View.drawUpdate(UI.getWinnersTemplate(response.winners), tableElement);
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

  currentPageElement.textContent = `Page #${winnerStore.currentPage}`;
}

function paginationEvent() {
  const paginationElement = document.querySelector<HTMLElement>('[data-role="pagination-winners"]');
  paginationElement?.addEventListener('click', async ({ target }) => {
    if (target instanceof HTMLButtonElement) {
      if (target.dataset.role === 'button-pagination-prev') {
        winnerStore.currentPage -= 1;
        const response = await API.getWinners(winnerStore.currentPage);
        const tableElement = document.querySelector<HTMLTableElement>('.winners__table');
        if (!tableElement) {
          return;
        }
        tableElement.innerHTML = '';
        View.drawUpdate(UI.getWinnersTemplate(response.winners), tableElement);
        updatePaginationWinnerView();
        tableEvent();
      }

      if (target.dataset.role === 'button-pagination-next') {
        winnerStore.currentPage += 1;
        const response = await API.getWinners(winnerStore.currentPage);
        const tableElement = document.querySelector<HTMLTableElement>('.winners__table');
        if (!tableElement) {
          return;
        }
        tableElement.innerHTML = '';
        View.drawUpdate(UI.getWinnersTemplate(response.winners), tableElement);
        updatePaginationWinnerView();
        tableEvent();
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
