import './style.scss';

export class PriceSliderView {
  getElement() {
    const template = `
      <div class="price-slider">
        <h3 class="price-slider__title">Prices</h3>
        <div class="price-slider__slider"></div>
          <div class="price-slider__value-wrapper">
              <div class="price-slider__min">1</div>
              <div class="price-slider__max">1</div>
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