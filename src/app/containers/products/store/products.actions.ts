import * as ProductsActionTypes from './products.action-types';

import { Action } from '@ngrx/store';
import { ProductModel } from '@core/models/FruitModel';

/* eslint-disable no-console */

export class GetAllProducts implements Action {
  readonly type = ProductsActionTypes.GET_ALL_PRODUCTS;
  constructor() {
    console.log('\x1b[34m%s\x1b[0m', ProductsActionTypes.GET_ALL_PRODUCTS);
  }
}

export class InitializeProducts implements Action {
  readonly type = ProductsActionTypes.INITIALIZE_PRODUCTS;
  constructor(public payload: ProductModel[]) {
    console.log('\x1b[34m%s\x1b[0m', ProductsActionTypes.INITIALIZE_PRODUCTS);
  }
}

export class AddNewProduct implements Action {
  readonly type = ProductsActionTypes.ADD_NEW_PRODUCTS;
  constructor(public payload: ProductModel) {
    console.log('\x1b[34m%s\x1b[0m', ProductsActionTypes.ADD_NEW_PRODUCTS);
  }
}

export class DeleteProductById implements Action {
  readonly type = ProductsActionTypes.DELETE_PRODUCT_BY_ID;
  constructor(public payload: string) {
    console.log('\x1b[34m%s\x1b[0m', ProductsActionTypes.DELETE_PRODUCT_BY_ID);
  }
}

export class GetProductById implements Action {
  readonly type = ProductsActionTypes.GET_PRODUCT_BY_ID;
  constructor(public payload: string) {
    console.log('\x1b[34m%s\x1b[0m', ProductsActionTypes.GET_PRODUCT_BY_ID);
  }
}

export class UpdateProductById implements Action {
  readonly type = ProductsActionTypes.UPDATE_PRODUCT_BY_ID;
  constructor(public payload: ProductModel) {
    console.log('\x1b[34m%s\x1b[0m', ProductsActionTypes.UPDATE_PRODUCT_BY_ID);
  }
}

export type productsActions =
  | GetAllProducts
  | InitializeProducts
  | AddNewProduct
  | DeleteProductById
  | GetProductById
  | UpdateProductById;
