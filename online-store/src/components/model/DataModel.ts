import { IFilter, IProduct } from '../base/interface';
import products from './products.json';

export class DataModel {
  private readonly data: IProduct[];
  constructor() {
    this.data = products || [];
  }

  getData() {
    const data = this.data || [];
    return data;
  }

  filterName(data: IProduct[], name: string) {
    return data.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()));
  }

  filterSort(data: IProduct[], type: string) {
    const tmpData = [...data];

    if (type === 'name-asc') {
      tmpData.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
    }

    if (type === 'name-desc') {
      tmpData.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      })
    }

    if (type === 'year-asc') {
      tmpData.sort((a, b) => a.year - b.year);
    }

    if (type === 'year-desc') {
      tmpData.sort((a, b) => b.year - a.year);
    }
    return tmpData;
  }

  filterPrice(data: IProduct[], price: [number, number]) {
    return data.filter((product) => product.price >= price[0] && product.price <= price[1]);
  }

  filterYear(data: IProduct[], year: [number, number]) {
    return data.filter((product) => product.year >= year[0] && product.year <= year[1]);
  }

  filterQuantity(data: IProduct[], quantity: [number, number]) {
    return data.filter((product) => product.quantity >= quantity[0] && product.quantity <= quantity[1]);
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