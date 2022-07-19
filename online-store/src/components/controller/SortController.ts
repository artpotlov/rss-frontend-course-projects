import { IFilter } from "../base/interface";
import { DataModel } from "../model/DataModel";
import { AppView } from "../view/AppView";
import { LSController } from "./LSController";

export class SortController {
  constructor(private readonly dataModel: DataModel, private readonly appView: AppView, private readonly lsController: LSController) {}

  init() {
    this.updateStates();
    const selectElement = document.querySelector<HTMLSelectElement>('.info-panel__select');

    if (!selectElement) {
      return ;
    }

    selectElement.addEventListener('change', (ev) => {
      const target = ev.target;

      if (!target) {
        return ;
      }

      const targetElement = <HTMLSelectElement>target;
      this.updateCards(targetElement.value);
    });
  }

  private updateCards(value = 'name-asc') {
    let filterConditionals: IFilter = { sort: 'name-asc' };
    const conditionals = this.lsController.getFilters();

    if (conditionals) {
      filterConditionals = conditionals;
    }

    filterConditionals.sort = value;
    this.lsController.setFilters(filterConditionals);

    const filteringData = this.dataModel.updatefilters(filterConditionals);
    this.appView.drawCards(filteringData, this.lsController.getDataCart());
  }

  updateStates() {
    const selectElement = document.querySelector<HTMLSelectElement>('.info-panel__select');

    if (!selectElement) {
      return ;
    }

    const values = this.lsController.getFilters();
    if (!values) {
      return ;
    }

    let valueIndex = 1;
    if (values.sort === 'name-asc') valueIndex = 1;
    if (values.sort === 'name-desc') valueIndex = 2;
    if (values.sort === 'year-asc') valueIndex = 3;
    if (values.sort === 'year-desc') valueIndex = 4;

    selectElement.selectedIndex = valueIndex;
  }
}