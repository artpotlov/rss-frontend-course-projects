import './style.scss';

export class SizeView {
  getElement() {
    const template = `
    <details open class="size">
      <summary>Size</summary>
      <ul class="size__list">
        <li class="size__item">
          <label>
            <input type="checkbox" class="size__checkbox" data-size="6">
            6
          </label>
        </li>
        <li class="size__item">
          <label>
            <input type="checkbox" class="size__checkbox" data-size="7">
            7
          </label>
        </li>
        <li class="size__item">
          <label>
            <input type="checkbox" class="size__checkbox" data-size="8">
            8
          </label>
        </li>
        <li class="size__item">
          <label>
            <input type="checkbox" class="size__checkbox" data-size="9">
            9
          </label>
        </li>
        <li class="size__item">
          <label>
            <input type="checkbox" class="size__checkbox" data-size="10">
            10
          </label>
        </li>
        <li class="size__item">
          <label>
            <input type="checkbox" class="size__checkbox" data-size="11">
            11
          </label>
        </li>
        <li class="size__item">
          <label>
            <input type="checkbox" class="size__checkbox" data-size="12">
            12
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