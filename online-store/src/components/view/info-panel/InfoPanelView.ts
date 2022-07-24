import './style.scss';

export class InfoPanelView {
  constructor (private readonly rootElement: HTMLElement) {}

  draw() {
    const template = `
    <section class="info-panel">
      <div class="info-panel__title">Men Shoes</div>
        <select name="sortBy" id="sort-by" class="info-panel__select">
          <option value="" disabled>Sort By</option>
          <option value="name-asc">Name ascending</option>
          <option value="name-desс">Name descending</option>
          <option value="year-asc">Year ascending</option>
          <option value="year-desс">Year descending</option>
        </select>
    </section>
    `;

    const element = document.createElement('div');
    element.innerHTML = template.trim();
    const result = element.firstChild;

    if (!result) {
      return ;
    }

    this.rootElement.appendChild(result);
  }
}