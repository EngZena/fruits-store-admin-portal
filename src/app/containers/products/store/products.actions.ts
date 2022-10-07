import * as ProductsActionTypes from './products.action-types';

import { Action } from '@ngrx/store';
import { ProductsModel } from '@core/models/FruitsModel';

export class GetAllProducts implements Action {
  readonly type = ProductsActionTypes.GET_ALL_PRODUCTS;
  constructor() {}
}

export class InitializeProducts implements Action {
  readonly type = ProductsActionTypes.INITIALIZE_PRODUCTS;
  constructor(public payload: ProductsModel[]) {}
}

export class AddNewProduct implements Action {
  readonly type = ProductsActionTypes.ADD_NEW_PRODUCTS;
  constructor(public payload: ProductsModel) {}
}

export type productsActions =
  | GetAllProducts
  | InitializeProducts
  | AddNewProduct;
