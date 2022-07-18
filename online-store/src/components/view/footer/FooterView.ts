import './style.scss';

export class FooterView {
  constructor (private readonly rootElement: HTMLElement) {}

  draw() {
    const template = `
    <footer class="footer">
      <div class="footer__wrapper">
        <div>RS School</div>
        <div class="footer__copyright-wrapper">
          <a href="https://github.com/artpotlov">GitHub</a>
          <span>Copyright 2022</span>
        </div>
      </div>
    </footer>
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