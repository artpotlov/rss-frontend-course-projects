import './style.scss';

export class ManufactureView {
  getElement() {
    const template = `
    <details open class="manufacture">
      <summary>Manufacture</summary>
      <ul class="manufacture__list">
        <li class="manufacture__item">
          <label>
            <input type="checkbox" class="manufacture__checkbox" data-manufacture="Adidas">
            Adidas
          </label>
        </li>
        <li class="manufacture__item">
          <label>
            <input type="checkbox" class="manufacture__checkbox" data-manufacture="Nike">
            Nike
          </label>
        </li>
      </ul>
    </details>
    `;

    const element = document.createElement('div');
    element.innerHTML = template;
    const result = element.firstElementChild;

    if (!result) {
      return ;
    }
    return result;
  }
}