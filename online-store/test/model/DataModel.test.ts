import { DataModel } from '../../src/components/model/DataModel';
import products from '../../src/components/model/products.json';

describe('Check DataModel class:', () => {
  const dataModel = new DataModel();

  test('new DataModel', () => {
    expect(dataModel).toBeDefined();
  });

  test('check equal data', () => {
    expect(dataModel.getData()).toEqual(products);
  });

  test('empty conditions', () => {
    expect(dataModel.updatefilters({})).toEqual(products);
    expect(dataModel.updatefilters({})).not.toBe(products);
  });

  test('check name filter', () => {
    expect(dataModel.filterName(products, '')).toEqual(products);
    expect(dataModel.filterName(products, '')).not.toBe(products);
    expect(dataModel.filterName(products, 'air')).toHaveLength(8);
    expect(dataModel.filterName(products, 'AiR')).toHaveLength(8);
    expect(dataModel.filterName(products, 'er Tr 2')).toHaveLength(6);
  });

  test('check price price filter', () => {
    expect(dataModel.filterPrice(products, { min: 0, max: 0} )).toHaveLength(0);
    expect(dataModel.filterPrice(products, { min: 1000, max: 2000} )).toHaveLength(0);
    expect(dataModel.filterPrice(products, { min: 101, max: 222} )).toHaveLength(7);
  });
  
  test('check year filter', () => {
    expect(dataModel.filterYear(products, { min: 0, max: 0 })).toHaveLength(0);
    expect(dataModel.filterYear(products, { min: 2023, max: 2024 })).toHaveLength(0);
    expect(dataModel.filterYear(products, { min: 2019, max: 2021 })).toHaveLength(13);
    expect(dataModel.filterYear(products, { min: 2022, max: 2022 })).toHaveLength(9);
  });

  test('check manufacture filter', () => {
    expect(dataModel.filterManufacture(products, [])).toEqual(products);
    expect(dataModel.filterManufacture(products, ['Adidas'])).toHaveLength(10);
    expect(dataModel.filterManufacture(products, ['Nike'])).toHaveLength(12);
    expect(dataModel.filterManufacture(products, ['Adidas', 'Li ning'])).toHaveLength(10);
    expect(dataModel.filterManufacture(products, ['Li Ning'])).toHaveLength(0);
  });

  test('check color filter', () => {
    expect(dataModel.filterColor(products, [])).toEqual(products);
    expect(dataModel.filterColor(products, ['Red'])).toHaveLength(1);
    expect(dataModel.filterColor(products, ['Red', 'White'])).toHaveLength(8);
    expect(dataModel.filterColor(products, ['Orange'])).toHaveLength(0);
  });

  test('check size filter', () => {
    expect(dataModel.filterSize(products, [])).toEqual(products);
    expect(dataModel.filterSize(products, ['6'])).toHaveLength(1);
    expect(dataModel.filterSize(products, ['6', '7'])).toHaveLength(3);
    expect(dataModel.filterSize(products, ['13'])).toHaveLength(0);
    expect(dataModel.filterSize(products, ['5'])).toHaveLength(0);
    expect(dataModel.filterSize(products, ['0'])).toHaveLength(0);
    expect(dataModel.filterSize(products, ['zero'])).toHaveLength(0);
    expect(dataModel.filterSize(products, ['six'])).toHaveLength(0);
  });

  test('check popular filter', () => {
    expect(dataModel.filterPopular(products, false)).toEqual(products);
    expect(dataModel.filterPopular(products, true)).toHaveLength(11);
  });

  test('check quantity filter', () => {
    expect(dataModel.filterQuantity(products, { min: 1, max: 1000 })).toEqual(products);
    expect(dataModel.filterQuantity(products, { min: 1, max: 1 })).toHaveLength(0);
    expect(dataModel.filterQuantity(products, { min: 1, max: 44 })).toHaveLength(11);
  });
});