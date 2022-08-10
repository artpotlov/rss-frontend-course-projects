import { DataModel } from "../model/DataModel";
import { AppView } from "../view/AppView";
import { LSController } from "./LSController";
import * as noUiSlider from 'nouislider';
import { IFilter, IYear } from "../base/interface";

export class YearController {
  constructor(private readonly dataModel: DataModel, private readonly appView: AppView, private readonly lsController: LSController) {}

  private getFilter(): IYear {
    const conditionals = this.lsController.getFilters();

    if (conditionals?.year) {
      return conditionals.year;
    }

    return { min: 2019, max: 2022 };
  }

  private updateCards(value?: IYear) {
    let filterConditionals: IFilter = { year: { min: 2019, max: 2022 } };
    const conditionals = this.lsController.getFilters();

    if (conditionals) {
      filterConditionals = conditionals;
    }

    filterConditionals.year = value || { min: 2019, max: 2022 };
    this.lsController.setFilters(filterConditionals);

    const filteringData = this.dataModel.updatefilters(filterConditionals);
    this.appView.drawCards(filteringData, this.lsController.getDataCart());
  }

  updateStates() {
    const slider = document.querySelector<HTMLElement>('.year-slider__slider') as noUiSlider.target;

    if (!slider) {
      return ;
    }

    if (!slider.noUiSlider) {
      return ;
    }
    const filterValues = this.getFilter();
      slider.noUiSlider.set([filterValues.min, filterValues.max]);
  }

  private initYearController() {
    const slider = document.querySelector<HTMLElement>('.year-slider__slider') as noUiSlider.target;
    const sliderMin = document.querySelector<HTMLElement>('.year-slider__min');
    const sliderMax = document.querySelector<HTMLElement>('.year-slider__max');

    if (!slider) {
      return ;
    }

    noUiSlider.create(slider, {
      start: [2019, 2022],
      step: 1,
      connect: true,
      range: {
        'min': 2019,
        'max': 2022,
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
      this.updateCards({ min: +values[0], max: +values[1] });
    });
  }

  init() {
    this.initYearController();
  }
}