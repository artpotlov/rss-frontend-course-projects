import './style.scss';

export class YearSliderView {
  getElement() {
    const template = `
      <div class="year-slider">
        <h3 class="year-slider__title">Years</h3>
        <div class="year-slider__slider"></div>
          <div class="year-slider__value-wrapper">
              <div class="year-slider__min">1</div>
              <div class="year-slider__max">1</div>
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