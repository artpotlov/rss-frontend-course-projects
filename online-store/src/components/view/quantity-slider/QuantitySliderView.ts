import './style.scss';

export class QuantitySliderView {
  getElement() {
    const template = `
      <div class="quantity-slider">
        <h3 class="quantity-slider__title">Quantity</h3>
        <div class="quantity-slider__slider"></div>
          <div class="quantity-slider__value-wrapper">
              <div class="quantity-slider__min">1</div>
              <div class="quantity-slider__max">1</div>
          </div>
        </div>
      </div>
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