import * as fromAuth from '@containers/login-page/store/auth.reducer';
import * as fromProducts from '@containers/products/store/products.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  products: fromProducts.productsState;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  products: fromProducts.productsReducers,
  auth: fromAuth.authReducer,
};
