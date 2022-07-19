import './style.scss';

export class ColorView {
  getElement() {
    const template = `
    <details open class="color">
      <summary>Color</summary>
      <ul class="color__list">
        <li class="color__item">
          <label>
            <input type="checkbox" class="color__checkbox" data-color="Green">
            Green
          </label>
        </li>
        <li class="color__item">
          <label>
            <input type="checkbox" class="color__checkbox" data-color="White">
            White
          </label>
        </li>
        <li class="color__item">
          <label>
            <input type="checkbox" class="color__checkbox" data-color="Black">
            Black
          </label>
        </li>
        <li class="color__item">
          <label>
            <input type="checkbox" class="color__checkbox" data-color="Red">
            Red
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