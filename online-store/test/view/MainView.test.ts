/**
 * @jest-environment jsdom
 */

import { MainView } from "../../src/components/view/main/MainView";

describe('Testing header view:', () => {
  const template = `
    <main class="main">
      <aside class="filter-panel">
        <div class="filter-panel__filters"></div>
        <button class="filter-panel__button filter-panel__button-rf">Reset filters</button>
        <button class="filter-panel__button filter-panel__button-rs">Reset settings</button>
      </aside>
      <section class="content"></section>
    </main>
  `;

  document.body.innerHTML = '<div id="App"></div>';
  const app = document.querySelector<HTMLElement>('#App');
  
  if (!app) {
    return ;
  }
  
  const mainView = new MainView(app);

  beforeEach(() => {
    app.innerHTML = '';
  });

  test('check draw method', () => {
    mainView.draw();
    expect(app.innerHTML.trim().split(' ').join('')).toBe(template.trim().split(' ').join(''));
  });

  test('check drawContent method with cards', () => {
    mainView.draw();

    const createCardElement = (text = '') => {
      const cardElement = document.createElement('div');
      cardElement.textContent = 'This is the card template' + text;
      return cardElement;
    }

    mainView.drawContent([createCardElement(' 1'), createCardElement(' 2'), createCardElement(' 3')]);

    const contentContainer = app.querySelector<HTMLElement>('.content');

    expect(contentContainer?.childElementCount).toBe(3);
    expect(contentContainer?.firstChild?.textContent).toBe('This is the card template 1');
    expect(contentContainer?.lastChild?.textContent).toBe('This is the card template 3');
  });

  test('check drawContent method without cards', () => {
    mainView.draw();
    mainView.drawContent([]);

    const errorMessageElement = '<h2 class="content__error">☹️ Sorry, no matches found</h2>';

    const contentContainer = app.querySelector<HTMLElement>('.content');

    expect(contentContainer?.innerHTML.trim().split(' ').join('')).toBe(errorMessageElement.trim().split(' ').join(''));
  });

  test('check drawFilter method with filter elements', () => {
    mainView.draw();

    const createFilterElement = (text = '') => {
      const filterElement = document.createElement('div');
      filterElement.textContent = 'This is the filter' + text;
      return filterElement;
    }

    mainView.drawFilter(createFilterElement(' 1'));
    mainView.drawFilter(createFilterElement(' 2'));
    mainView.drawFilter(createFilterElement(' 3'));

    const filterContainer = app.querySelector<HTMLElement>('.filter-panel__filters');

    expect(filterContainer?.childElementCount).toBe(3);
    expect(filterContainer?.firstChild?.textContent).toBe('This is the filter 1');
    expect(filterContainer?.lastChild?.textContent).toBe('This is the filter 3');
  });
});