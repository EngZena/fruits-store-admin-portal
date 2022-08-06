import { catchError, map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from './http-instanse';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  getCustoemrsData() {
    return this.http.get(`${baseURL}/usersData.json`).pipe(
      map(responseData => {
        if (responseData != null) {
          const customersList = Object.values(responseData);
          return customersList;
        }
        return null;
      }),
      catchError(responseError => {
        console.error(responseError);
        const customersList: any[] = [];
        return customersList;
      })
    );
  }
}
