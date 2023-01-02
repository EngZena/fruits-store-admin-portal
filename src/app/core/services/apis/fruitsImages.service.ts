import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FruitModel } from '@core/models/FruitModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from './http-instanse';

@Injectable({
  providedIn: 'root',
})
export class FruitsImagesService {
  requestError = new Subject<String>();

  constructor(private http: HttpClient) {}

  getFruitImage(fruitName: string) {
    return this.http
      .get<FruitModel[]>(`${baseURL}/fruitsImages/${fruitName}.json`)
      .pipe(
        map(responseData => {
          return Object.values(responseData);
        }),
        catchError(responseError => {
          return throwError(responseError);
        })
      );
  }
}
