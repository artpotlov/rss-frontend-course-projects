import './style.scss';

export class MainView {
  constructor (private readonly rootElement: HTMLElement) {}

  draw() {
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

    const element = document.createElement('div');
    element.innerHTML = template.trim();

    const resultElement = element.firstChild;

    if (!resultElement) {
      return ;
    }

    this.rootElement.appendChild(resultElement);
  }

  drawContent(cardsTemplate: Element[]) {
    const contentElement = this.rootElement.querySelector<HTMLElement>('.content');

    const errorMessageElement = document.createElement('h2');
    errorMessageElement.textContent = '☹️ Sorry, no matches found';
    errorMessageElement.className = 'content__error';

    if (!contentElement) {
      return ;
    }

    contentElement.innerHTML = '';

    if (!cardsTemplate || cardsTemplate.length === 0) {
      contentElement.appendChild(errorMessageElement);
      return ;
    }

    contentElement.append(...cardsTemplate);
  }

  drawFilters(filterElement: Element) {
    const filterContainer = this.rootElement.querySelector<HTMLElement>('.filter-panel__filters');

    if (!filterContainer) {
      return ;
    }
    filterContainer.append(filterElement);
  }
}