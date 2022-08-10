/**
 * @jest-environment jsdom
 */

import { FooterView } from "../../src/components/view/footer/FooterView";

 describe('Testing footer view:', () => {
  document.body.innerHTML = '<div id="App"></div>';
  const app = document.querySelector<HTMLElement>('#App');
  
  if (!app) {
    return ;
  }
  
  const footerView = new FooterView(app);

  beforeEach(() => {
    app.innerHTML = '';
    footerView.draw();
  });

  test('when draw method called, classList should be to contain footer', () => {
    const footerElement = document.querySelector<HTMLElement>('.footer');
    expect(footerElement?.classList).toContain('footer');
  });

  test('when draw method called, classList should be to contain footer__wrapper', () => {
    const footerElement = document.querySelector<HTMLElement>('.footer__wrapper');
    expect(footerElement?.classList).toContain('footer__wrapper');
  });
});