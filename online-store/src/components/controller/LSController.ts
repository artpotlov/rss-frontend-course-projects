import { IFilter } from "../base/types";

export class LSController {
  setFilters(conditionals: IFilter) {
    if (!conditionals) {
      return ;
    }
    localStorage.setItem('conditionals', JSON.stringify(conditionals));
  }

  getFilters() {
    const conditionalsStr = localStorage.getItem('conditionals');

    if(!conditionalsStr) {
      return ;
    }

    const conditionals: IFilter = JSON.parse(conditionalsStr);
    return conditionals;
  }

  getDataCart() {
    const cartData = localStorage.getItem('cart');

    if(!cartData) {
      return [];
    }

    const productIDs: string[] = JSON.parse(cartData);
    return productIDs;
  }

  setDataCart(products: string[]) {
    if (!products) {
      return ;
    }
    if (products.length < 21) {
      localStorage.setItem('cart', JSON.stringify(products));
      return 'ok';
    }
    return 'error';
  }
}