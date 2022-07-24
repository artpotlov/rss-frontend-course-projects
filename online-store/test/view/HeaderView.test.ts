/**
 * @jest-environment jsdom
 */

import { HeaderView } from "../../src/components/view/header/HeaderView";
import '../../src/components/view/header/style.scss';

describe('Testing header view:', () => {
  const template = `
    <header class="header">
      <div class="header__wrapper">
        <div class="header__logo">Online Store</div>
        <div class="header__input-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="header__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input type="search" name="searcher" id="searcher" placeholder="Search" class="header__input" autofocus="" autocompete="off">
        </div>
        <div class="header__shopping-cart">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          <span class="header__product-counter">20</span>
        </div>
      </div>
    </header>
  `;

  const templateElement = document.createElement('div');
  templateElement.innerHTML = template;
  
  document.body.innerHTML = '<div id="App"></div>';
  const app = document.querySelector<HTMLElement>('#App');
  
  if (!app) {
    return ;
  }
  
  const headerView = new HeaderView(app);

  beforeEach(() => {
    app.innerHTML = '';
  });

  test('check draw method', () => {
    headerView.draw();
    expect(app.firstElementChild).toEqual(templateElement.firstElementChild);
  });

  test('check drawCounter method without parameter', () => {
    headerView.draw();
    headerView.drawCounter();
    const counter = document.querySelector<HTMLElement>('.header__product-counter');
    expect(counter?.textContent).toBe('0');
  });

  test('check drawCounter method with random parameter', () => {
    headerView.draw();
    const rndVal = Math.random().toString();
    headerView.drawCounter(rndVal);
    const counter = document.querySelector<HTMLElement>('.header__product-counter');
    expect(counter?.textContent).toBe(rndVal);
  });
});