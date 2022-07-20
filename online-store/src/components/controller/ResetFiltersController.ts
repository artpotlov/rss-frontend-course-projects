import { IFilter } from "../base/interface";
import { DataModel } from "../model/DataModel";
import { AppView } from "../view/AppView";
import { AppController } from "./AppController";
import { LSController } from "./LSController";

export class ResetFiltersController {
  constructor(
    private readonly dataModel: DataModel,
    private readonly appView: AppView,
    private readonly appController: AppController,
    private readonly lsController: LSController
    ) {}

  init() {
    const buttonResetFilters = document.querySelector<HTMLButtonElement>('.filter-panel__button-rf');
    const buttonResetSettings = document.querySelector<HTMLButtonElement>('.filter-panel__button-rs');
    
    buttonResetFilters?.addEventListener('click', () => {
      this.resetFilters();
      this.updateStates();
    });

    buttonResetSettings?.addEventListener('click', () => {
      this.resetSettings();
      this.updateStates();
    });
  }

  private resetFilters() {
    const filterConditionals: IFilter = { sort: 'name-asc' };
    const conditionals = this.lsController.getFilters();

    if (conditionals) {
      filterConditionals.name = conditionals.name;
      filterConditionals.sort = conditionals.sort;
    }

    this.lsController.setFilters(filterConditionals);

    const filteringData = this.dataModel.updatefilters(filterConditionals);
    this.appView.drawCards(filteringData, this.lsController.getDataCart());
  }

  private resetSettings() {
    this.lsController.setFilters({});
    this.lsController.setDataCart([]);

    const filteringData = this.dataModel.updatefilters({});
    this.appView.drawCards(filteringData, this.lsController.getDataCart());
    this.appView.drawCounter([]);
  }

  private updateStates() {
    this.appController.updateStates();
  }
}