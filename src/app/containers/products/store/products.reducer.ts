import * as productsActionTypes from './products.action-types';

import {
  AddNewProduct,
  InitializeProducts,
  productsActions,
} from './products.actions';
import { FruitType, ProductsModel } from '@core/models/FruitsModel';

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

const initializeProducts = (
  action: InitializeProducts,
  state: productsState
) => {
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

export const addNewProduct = (action: AddNewProduct, state: productsState) => {
  state = {
    ...state,
    productsListItems: [...state.productsListItems, action.payload],
    total: state.total + 1,
  };
  return state;
};

export const productsReducers = (
  state = initialState,
  action: productsActions | any
) => {
  switch (action.type) {
    case productsActionTypes.INITIALIZE_PRODUCTS:
      return initializeProducts(action, state);
    case productsActionTypes.GET_ALL_PRODUCTS:
      return getAllProducts(state);
    case productsActionTypes.ADD_NEW_PRODUCTS:
      return addNewProduct(action, state);
    default:
      return state;
  }
};
