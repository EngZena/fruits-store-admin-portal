import { Action } from '@ngrx/store';

export const NEW_GLOBAL_ERROR = '[NGRX] [GLOBAL_ERROR] New global error';

/* eslint-disable no-console */

export class NewGlobalError implements Action {
  readonly type = NEW_GLOBAL_ERROR;
  constructor(public payload: string) {
    console.log('\x1b[34m%s\x1b[0m', NEW_GLOBAL_ERROR);
  }
}

export type GlobalErrors = NewGlobalError;
