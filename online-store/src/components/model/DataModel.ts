import { IFilter, IPrice, IProduct, IQuantity, IYear } from '../base/types';
import products from './products.json';

export class DataModel {
  private readonly data: IProduct[];
  constructor() {
    this.data = products || [];
  }

  getData() {
    return this.data || [];
  }

  filterName(data: IProduct[], name: string) {
    return data.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()));
  }

  private sortNameAsc(a: IProduct, b: IProduct) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }
  private sortNameDesc(a: IProduct, b: IProduct) {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;
    return 0;
  }
  private sortYearAsc(a: IProduct, b: IProduct) {
    return a.year - b.year;
  }
  private sortYearDesc(a: IProduct, b: IProduct) {
    return b.year - a.year;
  }

  filterSort(data: IProduct[], type: string) {
    const tmpData = [...data];

    if (type === 'name-asc') {
      tmpData.sort((a, b) => this.sortNameAsc(a, b))
    }

    if (type === 'name-desc') {
      tmpData.sort((a, b) => this.sortNameDesc(a, b));
    }

    if (type === 'year-asc') {
      tmpData.sort((a, b) => this.sortYearAsc(a, b));
    }

    if (type === 'year-desc') {
      tmpData.sort((a, b) => this.sortYearDesc(a, b));
    }
    return tmpData;
  }

  filterPrice(data: IProduct[], price: IPrice) {
    return data.filter((product) => product.price >= price.min && product.price <= price.max);
  }

  filterYear(data: IProduct[], year: IYear) {
    return data.filter((product) => product.year >= year.min && product.year <= year.max);
  }

  filterQuantity(data: IProduct[], quantity: IQuantity) {
    return data.filter((product) => product.quantity >= quantity.min && product.quantity <= quantity.max);
  }

  filterManufacture(data: IProduct[], manufacture: string[]) {
    if (manufacture.length === 0) return data;
    return data.filter((product) => manufacture.includes(product.manufacturer));
  }

  filterColor(data: IProduct[], color: string[]) {
    if (color.length === 0) return data;
    return data.filter((product) => color.includes(product.color));
  }

  filterSize(data: IProduct[], size: string[]) {
    if (size.length === 0) return data;
    return data.filter((product) => size.includes(product.size.toString()));
  }

  filterPopular(data: IProduct[], popular: boolean) {
    if (!popular) return data;
    return data.filter((product) => product.popular === popular);
  }

  updatefilters(conditions: IFilter) {
    let filteringData: IProduct[] = [...this.data];
    
    if (conditions.name) {
      filteringData = this.filterName(filteringData, conditions.name);
    }

    if (conditions.sort) {
      filteringData = this.filterSort(filteringData, conditions.sort);
    }

    if (conditions.price) {
      filteringData = this.filterPrice(filteringData, conditions.price);
    }

    if (conditions.year) {
      filteringData = this.filterYear(filteringData, conditions.year);
    }

    if (conditions.quantity) {
      filteringData = this.filterQuantity(filteringData, conditions.quantity);
    }

    if (conditions.manufacture) {
      filteringData = this.filterManufacture(filteringData, conditions.manufacture);
    }

    if (conditions.color) {
      filteringData = this.filterColor(filteringData, conditions.color);
    }

    if (conditions.size) {
      filteringData = this.filterSize(filteringData, conditions.size);
    }

    if (conditions.popular) {
      filteringData = this.filterPopular(filteringData, conditions.popular);
    }
    
    return filteringData;
  }
}