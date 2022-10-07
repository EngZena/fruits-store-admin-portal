import * as fromAuth from '@containers/login-page/store/auth.reducer';
import * as fromProducts from '@containers/products/store/products.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth: fromAuth.State;
  products: fromProducts.productsState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  products: fromProducts.productsReducers,
};
