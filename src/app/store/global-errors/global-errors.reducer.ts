import * as GlobalErrorsActions from './global-errors.action';

export interface State {
  error: string;
}

export function globalErrorsReducer(
  state: any = null,
  action: GlobalErrorsActions.GlobalErrors | any
) {
  switch (action.type) {
    case GlobalErrorsActions.NEW_GLOBAL_ERROR: {
      return action.payload;
    }

    default:
      return state;
  }
}
