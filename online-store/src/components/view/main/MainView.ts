import './style.scss';

export class MainView {
  constructor (
    private readonly rootElement: HTMLElement
    ) {}

  draw() {
    const template = `
    <main class="main">
      <aside class="filter-panel">
        <div class="filter-panel__filters"></div>
        <button class="filter-panel__button">Reset</button>
      </aside>
      <section class="content"></section>
    </main>
    `;

    const element = document.createElement('div');
    element.innerHTML = template.trim();
    const result = element.firstChild;

    if (!result) {
      return ;
    }

    this.rootElement.appendChild(result);
  }

  drawContent(cardsTemplate: Element[]) {
    const contentElement = this.rootElement.querySelector<HTMLElement>('.content');
    const errorMessage = document.createElement('h2');
    errorMessage.textContent = '☹️ Sorry, no matches found';
    errorMessage.className = 'content__error';

    if (!contentElement) {
      return ;
    }
    contentElement.innerHTML = '';

    if (!cardsTemplate || cardsTemplate.length === 0) {
      contentElement.appendChild(errorMessage);
      return ;
    }

    contentElement.append(...cardsTemplate);
  }

  drawFilters(filtersTemplate: Element) {
    const filterElement = this.rootElement.querySelector<HTMLElement>('.filter-panel__filters');

    if (!filterElement) {
      return ;
    }
    filterElement.append(filtersTemplate);
  }
}