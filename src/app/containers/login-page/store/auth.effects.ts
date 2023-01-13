import * as AuthActions from './auth.actions';
import * as services from '@core/services/apis/http-instanse';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '@core/services/auth.service';
import { CookiesService } from '@core/services/cookies.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/models/usesr.model';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true,
  });
};

const handleError = (errorResponse: any) => {
  let errorMessage = 'An unknown error occurred';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorResponse.error.error.message) {
    case 'EMAIL_NOT_FOUND':
      errorMessage = ' This email does not exist';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private cookiesService: CookiesService
  ) {}

  authSignup$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignUpStart) => {
        return this.http
          .post<AuthResponseData>(
            services.signupBaseUrl + environment.firebaseAPIkey,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap(resData => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map(resData => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            services.LoginBaseUrl + environment.firebaseAPIkey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap(resDate => {
              this.authService.setLogoutTimer(+resDate.expiresIn * 1000);
            }),
            map(resData => {
              this.cookiesService.setCookie('email', resData.email);
              this.cookiesService.setCookie('token', resData.idToken);
              this.cookiesService.setCookie('userId', resData.localId);
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
          if (authSuccessAction.payload.redirect) {
            this.router.navigate(['/products']);
          }
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData != null) {
          const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
          } = JSON.parse(storedData);

          if (!userData) {
            return { type: 'DUMMY' };
          }
          const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
          );
          if (loadedUser.token) {
            const expirationDuration =
              new Date(userData._tokenExpirationDate).getTime() -
              new Date().getTime();

            this.authService.setLogoutTimer(expirationDuration);
            return new AuthActions.AuthenticateSuccess({
              email: loadedUser.email,
              userId: loadedUser.id,
              token: loadedUser.token,
              expirationDate: new Date(userData._tokenExpirationDate),
              redirect: false,
            });
          }
        }
        return { type: 'DUMMY' };
      })
    )
  );

  authLogout$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          localStorage.clear();
          this.cookiesService.deleteAll();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
