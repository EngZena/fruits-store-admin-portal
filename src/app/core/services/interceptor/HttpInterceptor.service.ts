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

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const startdTime = Date.now();
    let requestStatus: string;
    const greenColor = 'background:green;color:black;font-size:20px';
    return next.handle(req).pipe(
      tap({
        next: event =>
          (requestStatus = event instanceof HttpResponse ? 'succeeded' : ''),
      }),
      catchError(error => {
        console.error('error is intercept');
        console.error(error);
        return throwError(error);
      }),
      finalize(() => {
        const elapsed = Date.now() - startdTime;
        let msg = `${req.method} "${req.urlWithParams.slice(74)}"
           ${requestStatus} in ${elapsed} ms.`;
        if (req.urlWithParams.includes('signInWithPassword')) {
          msg = `${req.method} "signInWithPassword"
            ${requestStatus} in ${elapsed} ms.`;
        }
        // eslint-disable-next-line no-console
        console.log('\x1b[32m%s\x1b[0m', msg);
      })
    );
  }
}
