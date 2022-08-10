import { DataModel } from '../../src/components/model/DataModel';
import products from '../../src/components/model/products.json';

describe('Check DataModel class:', () => {
  let dataModel: DataModel;

  beforeEach(() => {
    dataModel = new DataModel();
  });

  test('data model should be defined', () => {
    expect(dataModel).toBeDefined();
  });

  test('when getData method called, returned data should be to equal products', () => {
    expect(dataModel.getData()).toEqual(products);
  });

  describe('check empty conditions', () => {
    test('when empty conditions, returned data should be equal products', () => {
      expect(dataModel.updatefilters({})).toEqual(products);
    });
  
    test('when empty conditions, returned data should not be products', () => {
      expect(dataModel.updatefilters({})).not.toBe(products);
    });
  });

  describe('check filterName method', () => {
    test('when name is set in different case, should be returned the same result', () => {
      expect(dataModel.filterName(products, 'air')).toHaveLength(8);
      expect(dataModel.filterName(products, 'AiR')).toHaveLength(8);
      expect(dataModel.filterName(products, 'er Tr 2')).toHaveLength(6);
    });
  
    test('when name is empty, should be to equal products', () => {
      expect(dataModel.filterName(products, '')).toEqual(products);
    });
  });

  describe('check price filter', () => {
    test('when min value to equal max value, should be returned empty result', () => {
      expect(dataModel.filterPrice(products, { min: 0, max: 0} )).toHaveLength(0);
    });

    test('when min value is 1000 and max value is 2000, should be returned empty result', () => {
      expect(dataModel.filterPrice(products, { min: 1000, max: 2000} )).toHaveLength(0);
    });

    test('when min value is 101 and max value is 222, result length should be to equal 7', () => {
      expect(dataModel.filterPrice(products, { min: 101, max: 222} )).toHaveLength(7);
    });
  });
  
  describe('check year filter', () => {
    test('when min value and max value are 0, should be returned empty data', () => {
      expect(dataModel.filterYear(products, { min: 0, max: 0 })).toHaveLength(0);
    });
    test('when min value is 2023 and max value is 2024, should be returned empty data', () => {
      expect(dataModel.filterYear(products, { min: 2023, max: 2024 })).toHaveLength(0);
    });
    test('when min value is 2019 and max value is 2021, result length should be to equal 13', () => {
      expect(dataModel.filterYear(products, { min: 2019, max: 2021 })).toHaveLength(13);
    });
    test('when min value and max value are 2022, result length should be returned 9', () => {
      expect(dataModel.filterYear(products, { min: 2022, max: 2022 })).toHaveLength(9);
    });
  });

  describe('check manufacture filter', () => {
    test('when input array is empty, result should be to equal products', () => {
      expect(dataModel.filterManufacture(products, [])).toEqual(products);
    });
    test('when input array includes "Adidas" name, result length should be to equal 10', () => {
      expect(dataModel.filterManufacture(products, ['Adidas'])).toHaveLength(10);
    });
    test('when input array includes "Nike" name, result length should be to equal 12', () => {
      expect(dataModel.filterManufacture(products, ['Nike'])).toHaveLength(12);
    });
    test('when input array includes "Adidas" and "Li ning" names, result length should be to equal 10', () => {
      expect(dataModel.filterManufacture(products, ['Adidas', 'Li ning'])).toHaveLength(10);
    });
    test('when input array includes "Li Ning" name, result length should be to equal 0', () => {
      expect(dataModel.filterManufacture(products, ['Li Ning'])).toHaveLength(0);
    });
  });

  describe('check color filter', () => {
    test('when input array is empty, result should be to equal products', () => {
      expect(dataModel.filterColor(products, [])).toEqual(products);
    });
    test('when input array includes "Red" value, result length should be to equal 1', () => {
      expect(dataModel.filterColor(products, ['Red'])).toHaveLength(1);
    });
    test('when input array includes "Red" and "White" values, result length should be to equal 8', () => {
      expect(dataModel.filterColor(products, ['Red', 'White'])).toHaveLength(8);
    });
    test('when input array includes "Orange" value, result length should be to equal 0', () => {
      expect(dataModel.filterColor(products, ['Orange'])).toHaveLength(0);
    });
  });

  describe('check size filter', () => {
    test('when input array is empty, result should be to equal products', () => {
      expect(dataModel.filterSize(products, [])).toEqual(products);
    });
    test('when input array includes "6" size value, result length should be to equal 1', () => {
      expect(dataModel.filterSize(products, ['6'])).toHaveLength(1);
    });
    test('when input array includes "6" and "7" size values, result length should be to equal 3', () => {
      expect(dataModel.filterSize(products, ['6', '7'])).toHaveLength(3);
    });
    test('when input array includes "13" size value, result should be empty', () => {
      expect(dataModel.filterSize(products, ['13'])).toHaveLength(0);
    });
    test('when input array includes "5" size value, result should be empty', () => {
      expect(dataModel.filterSize(products, ['5'])).toHaveLength(0);
    });
    test('when input array includes "0" size value, result should be empty', () => {
      expect(dataModel.filterSize(products, ['0'])).toHaveLength(0);
    });
    test('when input array includes "zero" size value, result should be empty', () => {
      expect(dataModel.filterSize(products, ['zero'])).toHaveLength(0);
    });
    test('when input array includes "six" size value, result should be empty', () => {
      expect(dataModel.filterSize(products, ['six'])).toHaveLength(0);
    });
  });

  describe('check popular filter', () => {
    test('when input value is false, result should be to equal products', () => {
      expect(dataModel.filterPopular(products, false)).toEqual(products);
    });
    test('when input value is true, result length should be to equal 11', () => {
      expect(dataModel.filterPopular(products, true)).toHaveLength(11);
    });
  });

  describe('check quantity filter', () => {
    test('when min value is 1 and max value is 1000, result should be to equal products', () => {
      expect(dataModel.filterQuantity(products, { min: 1, max: 1000 })).toEqual(products);
    });
    test('when min value is 1 and max value is 1, result should be empty', () => {
      expect(dataModel.filterQuantity(products, { min: 1, max: 1 })).toHaveLength(0);
    });
    test('when min value is 1 and max value is 44, result length should be to equal 11', () => {
      expect(dataModel.filterQuantity(products, { min: 1, max: 44 })).toHaveLength(11);
    });
  });
});