import { IFilter } from "../base/interface";
import { DataModel } from "../model/DataModel";
import { AppView } from "../view/AppView";
import { LSController } from "./LSController";

export class ManufactureController {
  constructor(
    private readonly dataModel: DataModel,
    private readonly appView: AppView,
    private readonly lsController: LSController
    ) {}

  init() {
    this.updateStates();
    const checkboxes = document.querySelector<HTMLElement>('.manufacture__list');
    checkboxes?.addEventListener('click', () => {
      const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type=checkbox][data-manufacture]');
      const arrayCheckboxes = Array.from(checkboxes);
      const checkedCheckboxes = arrayCheckboxes.filter(e => e.checked).reduce((arr: string[], e) => {
        if (e.dataset.manufacture !== undefined) {
          arr.push(e.dataset.manufacture);
        }
        return arr;
      }, []);
      this.updateCards(checkedCheckboxes);
    });
  }

  private updateCards(value: string[] = []) {
    let filterConditionals: IFilter = { manufacture: [] };
    const conditionals = this.lsController.getFilters();

    if (conditionals) {
      filterConditionals = conditionals;
    }

    filterConditionals.manufacture = value;
    this.lsController.setFilters(filterConditionals);

    const filteringData = this.dataModel.updatefilters(filterConditionals);
    this.appView.drawCards(filteringData, this.lsController.getDataCart());
  }

  updateStates(){
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type=checkbox][data-manufacture]');
    if (!checkboxes) {
      return ;
    }
    const values = this.lsController.getFilters();
    if (!values) {
      return ;
    }
    checkboxes.forEach(e => {
      if (values.manufacture?.includes(e.dataset.manufacture as string)) {
        e.checked = true;
      } else {
        e.checked = false;
      }
    })
  }
}