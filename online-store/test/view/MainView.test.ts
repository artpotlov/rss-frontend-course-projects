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
});