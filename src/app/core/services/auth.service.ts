import * as AuthActions from '@containers/login-page/store/auth.actions';
import * as fromApp from '@store/app.reducer';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { baseURL } from '@core/services/apis/http-instanse';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  saveAdminsData(email: string) {
    return this.http
      .post(`${baseURL}/adminsData.json`, {
        email: email,
      })
      .pipe(
        catchError(responseError => {
          return throwError(responseError);
        })
      );
  }
}
