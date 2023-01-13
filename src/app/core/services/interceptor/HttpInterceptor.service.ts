import * as fromApp from '@store/app.reducer';
import * as fromGlobalErros from '@store/global-errors/global-errors.action';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const startdTime = Date.now();
    let requestStatus: string;
    let hasError: boolean = false;
    return next.handle(req).pipe(
      tap({
        next: event =>
          (requestStatus = event instanceof HttpResponse ? 'succeeded' : ''),
      }),
      catchError(error => {
        console.error('error is intercept');
        console.error(error);
        hasError = true;
        const errorMessage = (Object.values(error.error)[0] as any).message;
        this.store.dispatch(new fromGlobalErros.NewGlobalError(errorMessage));
        return throwError(error);
      }),
      finalize(() => {
        const elapsed = Date.now() - startdTime;
        let msg = `${req.method} "${req.urlWithParams.slice(74)}"
           ${requestStatus} in ${elapsed} ms.`;
        if (hasError) {
          msg = ` in ${elapsed} ms the ${req.method} request returns error ${requestStatus}`;
          // eslint-disable-next-line no-console
          console.log('\x1b[31m%s\x1b[0m', msg);
        } else {
          if (req.urlWithParams.includes('signInWithPassword')) {
            msg = `${req.method} "signInWithPassword"
              ${requestStatus} in ${elapsed} ms.`;
          }
          // eslint-disable-next-line no-console
          console.log('\x1b[32m%s\x1b[0m', msg);
        }
      })
    );
  }
}
