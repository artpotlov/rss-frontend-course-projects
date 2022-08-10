import { IFilter } from "../base/interface";
import { DataModel } from "../model/DataModel";
import { AppView } from "../view/AppView";
import { LSController } from "./LSController";

export class PopularController {
  constructor(
    private readonly dataModel: DataModel,
    private readonly appView: AppView,
    private readonly lsController: LSController
    ) {}

  private updateCards(value = false) {
    let filterConditionals: IFilter = { popular: false };
    const conditionals = this.lsController.getFilters();

    if (conditionals) {
      filterConditionals = conditionals;
    }

    filterConditionals.popular = value;
    this.lsController.setFilters(filterConditionals);

    const filteringData = this.dataModel.updatefilters(filterConditionals);
    this.appView.drawCards(filteringData, this.lsController.getDataCart());
  }

  updateStates(){
    const checkbox = document.querySelector<HTMLInputElement>('input[type=checkbox][data-popular]');
    if (!checkbox) {
      return ;
    }

    const values = this.lsController.getFilters();
    if (!values) {
      return ;
    }

    if (values.popular) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  }

  private initPopularController() {
    this.updateStates();
    const checkbox = document.querySelector<HTMLElement>('.popular__list');
    checkbox?.addEventListener('click', () => {
      const checkbox = document.querySelector<HTMLInputElement>('input[type=checkbox][data-popular]');
      const checkedCheckbox = checkbox?.checked;
      this.updateCards(checkedCheckbox);
    });
  }

  init() {
    this.initPopularController();
  }
}