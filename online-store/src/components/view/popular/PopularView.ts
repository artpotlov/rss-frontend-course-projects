import './style.scss';

export class PopularView {
  getElement() {
    const template = `
    <details open class="popular">
      <summary>Popular</summary>
      <ul class="popular__list">
        <li class="popular__item">
          <label>
            <input type="checkbox" class="popular__checkbox" data-popular="popular">
            Only popular
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