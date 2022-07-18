import './style.scss';

export class HeaderView {
  constructor (private readonly rootElement: HTMLElement) {}

  draw() {
    const template = `
    <header class="header">
      <div class="header__wrapper">
        <div class="header__logo">OnlineStore</div>
        <div class="header__input-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="header__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="search" name="searcher" id="searcher" placeholder="Search" class="header__input">
        </div>
        <div class="header__shopping-cart">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span class="header__product-counter">20</span>
        </div>
      </div>
    </header>
    `;
    const element = document.createElement('div');
    element.innerHTML = template.trim();
    const result = element.firstChild;

    if(!result) {
      return ;
    }

    this.rootElement.appendChild(result);
  }
}