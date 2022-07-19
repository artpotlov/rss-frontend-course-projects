import { IFilter } from "../base/interface";
import { DataModel } from "../model/DataModel";
import { AppView } from "../view/AppView";
import { LSController } from "./LSController";

export class SearchController {
  constructor(private readonly dataModel: DataModel, private readonly appView: AppView, private readonly lsController: LSController) {}

  init() {
    const searchElement = document.querySelector<HTMLInputElement>('.header__input');

    if (!searchElement) {
      return ;
    }

    if (searchElement.value.length === 0) {
      this.updateCards();
    }

    searchElement.addEventListener('input', (ev) => {
      const target = ev.target;

      if (!ev.target) {
        return ;
      }

      const targetElement = <HTMLInputElement>target;
      this.updateCards(targetElement.value)
    });
  }

  private updateCards(value?: string) {
    let filterConditionals: IFilter = { name: '' };
    const conditionals = this.lsController.getFilters();

    if (conditionals) {
      filterConditionals = conditionals;
    }

    filterConditionals.name = value || '';
    this.lsController.setFilters(filterConditionals);

    const filteringData = this.dataModel.updatefilters(filterConditionals);
    this.appView.drawCards(filteringData, this.lsController.getDataCart());
  }
}