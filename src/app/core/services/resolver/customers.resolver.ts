import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { CustomersService } from '../apis/customers.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomersResolver implements Resolve<any> {
  constructor(private customersService: CustomersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.customersService.getCustoemrsData();
  }
}
