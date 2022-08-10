import { IFilter } from "../base/types";
import { DataModel } from "../model/DataModel";
import { AppView } from "../view/AppView";
import { LSController } from "./LSController";

export class ColorController {
  constructor(
    private readonly dataModel: DataModel,
    private readonly appView: AppView,
    private readonly lsController: LSController
    ) {}

  private updateCards(value: string[] = []) {
    let filterConditionals: IFilter = { color: [] };
    const conditionals = this.lsController.getFilters();

    if (conditionals) {
      filterConditionals = conditionals;
    }

    filterConditionals.color = value;
    this.lsController.setFilters(filterConditionals);

    const filteringData = this.dataModel.updatefilters(filterConditionals);
    this.appView.drawCards(filteringData, this.lsController.getDataCart());
  }

  updateStates(){
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type=checkbox][data-color]');
    if (!checkboxes) {
      return ;
    }
    const values = this.lsController.getFilters();
    if (!values) {
      return ;
    }
    checkboxes.forEach(e => {
      if (values.color?.includes(e.dataset.color as string)) {
        e.checked = true;
      } else {
        e.checked = false;
      }
    })
  }

  private initColorController () {
    this.updateStates();
    const checkboxes = document.querySelector<HTMLElement>('.color__list');
    checkboxes?.addEventListener('click', () => {
      const arrayCheckboxes = Array.from(document.querySelectorAll<HTMLInputElement>('input[type=checkbox][data-color]'));
      const checkedCheckboxes = arrayCheckboxes.filter(e => e.checked)
      const checkedElements = checkedCheckboxes.reduce((arr: string[], e) => {
        if (e.dataset.color !== undefined) {
          arr.push(e.dataset.color);
        }
        return arr;
      }, []);
      this.updateCards(checkedElements);
    });
  }

  init() {
    this.initColorController();
  }
}