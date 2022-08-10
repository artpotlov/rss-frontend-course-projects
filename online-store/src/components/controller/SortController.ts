import { IFilter, SortType } from "../base/types";
import { DataModel } from "../model/DataModel";
import { AppView } from "../view/AppView";
import { LSController } from "./LSController";

export class SortController {
  constructor(private readonly dataModel: DataModel, private readonly appView: AppView, private readonly lsController: LSController) {}

  private updateCards(value = 'name-asc') {
    let filterConditionals: IFilter = { sort: SortType.nameAsc };
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
    if (values.sort === SortType.nameAsc) valueIndex = 1;
    if (values.sort === SortType.nameDesc) valueIndex = 2;
    if (values.sort === SortType.yearAsc) valueIndex = 3;
    if (values.sort === SortType.yearDesc) valueIndex = 4;

    selectElement.selectedIndex = valueIndex;
  }

  private initSortController() {
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

  init() {
    this.initSortController();
  }
}