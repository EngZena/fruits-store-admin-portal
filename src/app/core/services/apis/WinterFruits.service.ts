import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FruitModel } from '@core/models/FruitModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from './http-instanse';

@Injectable({
  providedIn: 'root',
})
export class WinterFruitsService {
  requestError = new Subject<String>();

  constructor(private http: HttpClient) {}

  getWinterFruits() {
    return this.http.get<FruitModel[]>(`${baseURL}/winterFruits.json`).pipe(
      map(responseData => {
        const winterFruits: FruitModel[] = [];
        responseData.map(item => {
          winterFruits.push(item);
        });
        return winterFruits;
      }),
      catchError(responseError => {
        return throwError(responseError);
      })
    );
  }
}
