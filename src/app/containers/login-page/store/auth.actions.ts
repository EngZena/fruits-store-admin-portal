import { Action } from '@ngrx/store';

export const LOGIN_START = '[NGRX] [Auth] Login start';
export const AUTHENTICATE_SUCCESS = '[NGRX] [Auth] Login';
export const AUTHENTICATE_FAIL = '[NGRX] [Auth] Login Fail';
export const SIGNUP_START = '[NGRX] [Auth] Signup Start';
export const CLEAR_ERROR = '[NGRX] [Auth] Clear Error';
export const AUTO_LOGIN = '[NGRX] [Auth] Auto Login';
export const LOGOUT = '[NGRX] [Auth] Logout';

/* eslint-disable no-console */

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor() {
    console.log('\x1b[34m%s\x1b[0m', LOGOUT);
  }
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {
    console.log('\x1b[34m%s\x1b[0m', LOGIN_START);
  }
}

export class SignUpStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {
    console.log('\x1b[34m%s\x1b[0m', SIGNUP_START);
  }
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {
    console.log('\x1b[34m%s\x1b[0m', AUTHENTICATE_FAIL);
  }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
  constructor() {
    console.log('\x1b[34m%s\x1b[0m', CLEAR_ERROR);
  }
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
  constructor() {
    console.log('\x1b[34m%s\x1b[0m', AUTO_LOGIN);
  }
}

export type AuthActions =
  | AuthenticateSuccess
  | AuthenticateFail
  | LoginStart
  | SignUpStart
  | Logout
  | AutoLogin
  | ClearError;
