import { DataModel } from "../model/DataModel";
import { AppView } from "../view/AppView";
import { LSController } from "./LSController";
import * as noUiSlider from 'nouislider';
import { IFilter } from "../base/interface";

export class QuantityController {
  constructor(private readonly dataModel: DataModel, private readonly appView: AppView, private readonly lsController: LSController) {}
  init() {
    const slider = document.querySelector<HTMLElement>('.quantity-slider__slider') as noUiSlider.target;
    const sliderMin = document.querySelector<HTMLElement>('.quantity-slider__min');
    const sliderMax = document.querySelector<HTMLElement>('.quantity-slider__max');

    if (!slider) {
      return ;
    }

    noUiSlider.create(slider, {
      start: [1, 1000],
      step: 1,
      connect: true,
      range: {
        'min': 1,
        'max': 1000,
      },
      format: {
        to: (value) => {
            return Math.ceil(value);
        },
        from: (value) => {
            return Number(value);
        }
      }
    });

    if (!slider.noUiSlider || !sliderMin || !sliderMax) {
      return ;
    }

    const filterValue = this.getFilter();

    if (filterValue) {
      slider.noUiSlider.set(filterValue)
    }

    slider.noUiSlider.on('update', (values) => {
      sliderMin.innerHTML = values[0] as string;
      sliderMax.innerHTML = values[1] as string;
      this.updateCards([values[0] as number, values[1] as number]);
    });

  }

  private getFilter() {
    const conditionals = this.lsController.getFilters();

    if (conditionals?.quantity) {
      return conditionals.quantity;
    }

    return [1, 1000];
  }

  private updateCards(value?: [number, number]) {
    let filterConditionals: IFilter = { quantity: [1, 1000] };
    const conditionals = this.lsController.getFilters();

    if (conditionals) {
      filterConditionals = conditionals;
    }

    filterConditionals.quantity = value || [1, 1000];
    this.lsController.setFilters(filterConditionals);

    const filteringData = this.dataModel.updatefilters(filterConditionals);
    this.appView.drawCards(filteringData, this.lsController.getDataCart());
  }

  updateStates() {
    const slider = document.querySelector<HTMLElement>('.quantity-slider__slider') as noUiSlider.target;

    if (!slider) {
      return ;
    }

    if (!slider.noUiSlider) {
      return ;
    }
    const filterValues = this.getFilter();
      slider.noUiSlider.set(filterValues);
  }
}