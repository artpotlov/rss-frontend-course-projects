import { IFilter } from "../base/interface";
import { DataModel } from "../model/DataModel";
import { AppView } from "../view/AppView";
import { LSController } from "./LSController";

export class SizeController {
  constructor(
    private readonly dataModel: DataModel,
    private readonly appView: AppView,
    private readonly lsController: LSController
    ) {}

  init() {
    this.updateStates();
    const checkboxes = document.querySelector<HTMLElement>('.size__list');
    checkboxes?.addEventListener('click', () => {
      const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type=checkbox][data-size]');
      const arrayCheckboxes = Array.from(checkboxes);
      const checkedCheckboxes = arrayCheckboxes.filter(e => e.checked).reduce((arr: string[], e) => {
        if (e.dataset.size !== undefined) {
          arr.push(e.dataset.size);
        }
        return arr;
      }, []);
      this.updateCards(checkedCheckboxes);
    });
  }

  private updateCards(value: string[] = []) {
    let filterConditionals: IFilter = { size: [] };
    const conditionals = this.lsController.getFilters();

    if (conditionals) {
      filterConditionals = conditionals;
    }

    filterConditionals.size = value;
    this.lsController.setFilters(filterConditionals);

    const filteringData = this.dataModel.updatefilters(filterConditionals);
    this.appView.drawCards(filteringData, this.lsController.getDataCart());
  }

  updateStates(){
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type=checkbox][data-size]');
    if (!checkboxes) {
      return ;
    }
    const values = this.lsController.getFilters();
    if (!values) {
      return ;
    }
    checkboxes.forEach(e => {
      if (values.size?.includes(e.dataset.size as string)) {
        e.checked = true;
      } else {
        e.checked = false;
      }
    })
  }
}