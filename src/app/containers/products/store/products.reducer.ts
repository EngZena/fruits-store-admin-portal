import * as productsActionTypes from './products.action-types';

import { FruitType, ProductsModel } from '@core/models/FruitsModel';
import { SetAllProducts, productsActions } from './products.actions';

export interface productsState {
  productsListItems: ProductsModel[];
  total: number;
}

const initialState: productsState = {
  productsListItems: [
    {
      id: 'null',
      name: 'null',
      image: 'null',
      price: 0,
      fruitType: FruitType.summerFruits,
    },
  ],
  total: 0,
};

const setAllProducts = (action: SetAllProducts, state: productsState) => {
  const productsList: ProductsModel[] = [];
  action.payload.forEach(product => {
    let productItem: ProductsModel = {
      id: Math.random().toString(),
      name: product.name,
      image: product.image,
      price: product.price,
      fruitType: product.fruitType,
    };
    productsList.push(productItem);
  });

  state = {
    ...state,
    productsListItems: [...productsList],
    total: productsList.length,
  };
  return state;
};

export const getAllProducts = (state: productsState) => {
  return state;
};

export const productsReducers = (
  state = initialState,
  action: productsActions | any
) => {
  switch (action.type) {
    case productsActionTypes.SET_ALL_PRODUCTS:
      return setAllProducts(action, state);
    case productsActionTypes.GET_ALL_PRODUCTS:
      return getAllProducts(state);
    default:
      return state;
  }
};
