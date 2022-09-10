import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FruitsModel } from '@core/models/FruitsModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from './http-instanse';

@Injectable({
  providedIn: 'root',
})
export class SummerFruitsService {
  requestError = new Subject<String>();

  constructor(private http: HttpClient) {}

  getSummerFruits() {
    return this.http.get<FruitsModel[]>(`${baseURL}/summerFruits.json`).pipe(
      map(responseData => {
        const summerFruits: FruitsModel[] = [];
        responseData.map(item => {
          summerFruits.push(item);
        });
        return summerFruits;
      }),
      catchError(responseError => {
        return throwError(responseError);
      })
    );
  }
}
