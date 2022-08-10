import { DataModel } from "../model/DataModel";
import { AppView } from "../view/AppView";
import { LSController } from "./LSController";
import * as noUiSlider from 'nouislider';
import { IFilter, IQuantity } from "../base/types";

export class QuantityController {
  constructor(private readonly dataModel: DataModel, private readonly appView: AppView, private readonly lsController: LSController) {}

  private getFilter(): IQuantity {
    const conditionals = this.lsController.getFilters();

    if (conditionals?.quantity) {
      return conditionals.quantity;
    }

    return { min: 1, max: 1000 };
  }

  private updateCards(value?: IQuantity) {
    let filterConditionals: IFilter = { quantity: { min: 1, max: 1000} };
    const conditionals = this.lsController.getFilters();

    if (conditionals) {
      filterConditionals = conditionals;
    }

    filterConditionals.quantity = value || { min: 1, max: 1000 };
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
      slider.noUiSlider.set([filterValues.min, filterValues.max]);
  }

  private initQuantityController() {
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
      slider.noUiSlider.set([filterValue.min, filterValue.max]);
    }

    slider.noUiSlider.on('update', (values) => {
      sliderMin.innerHTML = values[0].toString();
      sliderMax.innerHTML = values[1].toString();
      this.updateCards({ min: +values[0], max: +values[1]});
    });
  }

  init() {
    this.initQuantityController();
  }
}