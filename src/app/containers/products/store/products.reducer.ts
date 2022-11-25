import * as productsActionTypes from './products.action-types';

import {
  AddNewProduct,
  DeleteProductById,
  GetProductById,
  InitializeProducts,
  productsActions,
} from './products.actions';
import { FruitType, ProductModel } from '@core/models/FruitModel';

export interface productsState {
  productsListItems: ProductModel[];
  total: number;
  summerFruits: ProductModel[];
  winterFruits: ProductModel[];
  hasLoaded: boolean;
  productById: ProductModel | null;
}

const initialState: productsState = {
  productsListItems: [],
  total: 0,
  summerFruits: [],
  winterFruits: [],
  hasLoaded: false,
  productById: null,
};

const initializeProducts = (
  action: InitializeProducts,
  state: productsState
) => {
  const productsList: ProductModel[] = [];
  action.payload.forEach(product => {
    let productItem: ProductModel = {
      id: Math.random().toString(),
      name: product.name,
      image: product.image,
      imageName: product.imageName,
      price: product.price,
      fruitType: product.fruitType,
    };
    productsList.push(productItem);
  });

  state = {
    ...state,
    summerFruits: [
      ...productsList.filter(
        product => product.fruitType === FruitType.summerFruits
      ),
    ],
    winterFruits: [
      ...productsList.filter(
        product => product.fruitType === FruitType.winterFruits
      ),
    ],
    productsListItems: [...productsList],
    hasLoaded: true,
    total: productsList.length,
  };
  return state;
};

export const getAllProducts = (state: productsState) => {
  return state;
};

export const addNewProduct = (action: AddNewProduct, state: productsState) => {
  if (action.payload.fruitType === FruitType.summerFruits) {
    state = {
      ...state,
      summerFruits: [action.payload, ...state.summerFruits],
      productsListItems: [...state.productsListItems, action.payload],
      total: state.total + 1,
    };
  } else {
    state = {
      ...state,
      winterFruits: [action.payload, ...state.winterFruits],
      productsListItems: [...state.productsListItems, action.payload],
      total: state.total + 1,
    };
  }
  return state;
};

export const deleteProductById = (
  action: DeleteProductById,
  state: productsState
) => {
  state = {
    ...state,
    summerFruits: [
      ...state.summerFruits.filter(product => product.id !== action.payload),
    ],
    winterFruits: [
      ...state.winterFruits.filter(product => product.id !== action.payload),
    ],
    productsListItems: [
      ...state.productsListItems.filter(
        product => product.id !== action.payload
      ),
    ],
    total: state.productsListItems.length,
  };
  return state;
};

export const getProductById = (
  action: GetProductById,
  state: productsState
) => {
  const requiredProduct: ProductModel[] = state.productsListItems.filter(
    product => product.id === action.payload
  );
  state = {
    ...state,
    productById: requiredProduct[0],
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
    case productsActionTypes.DELETE_PRODUCT_BY_ID:
      return deleteProductById(action, state);
    case productsActionTypes.GET_PRODUCT_BY_ID:
      return getProductById(action, state);
    default:
      return state;
  }
};
