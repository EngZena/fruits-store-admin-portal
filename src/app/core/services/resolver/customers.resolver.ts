import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { CustomersService } from '../apis/customers.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class CustomersResolver implements Resolve<any> {
  constructor(private customersService: CustomersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('customers_data') === null) {
      return this.customersService.getCustoemrsData();
    } else {
      // eslint-disable-next-line no-console
      console.log(
        '\x1b[36m%s\x1b[0m',
        '[LOCAL STORAGE] [Customers] get customers data from local storage'
      );
      return of(JSON.parse(localStorage.getItem('customers_data')!));
    }
  }
}
