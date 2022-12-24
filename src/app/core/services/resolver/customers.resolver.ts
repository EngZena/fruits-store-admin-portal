import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class CustomersResolver implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return of(JSON.parse(localStorage.getItem('customers_data')!));
  }
}
