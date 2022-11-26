import { ProductModel } from '@core/models/FruitModel';

export const isEmptyArray = (array: any[]) => {
  return array.length === 0;
};

export const filterItems = (list: ProductModel[], id: string) => {
  return list.filter((item: ProductModel) => item.id !== id);
};

export const getRandomInt = (min = 10, max = 100) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
