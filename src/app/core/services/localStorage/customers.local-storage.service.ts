/* eslint-disable no-console */
import { CustomerModel } from '@core/models/cusromer.model';
import { CustomersService } from '../apis/customers.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersLocalStorageService {
  resetCustomerData: Subject<boolean> = new Subject();
  constructor(private customersService: CustomersService) {}

  resetCustomersData() {
    localStorage.removeItem('customers_data');
    console.log(
      '\x1b[36m%s\x1b[0m',
      '[LOCAL STORAGE] [Customers] remove customers data from local storage'
    );
    this.customersService
      .getCustoemrsData()
      .subscribe((result: CustomerModel[]) => {
        this.setCustomersData(result);
        this.resetCustomerData.next(true);
      });
  }

  setCustomersData(customersList: CustomerModel[]) {
    localStorage.setItem('customers_data', JSON.stringify(customersList));
    console.log(
      '\x1b[36m%s\x1b[0m',
      '[LOCAL STORAGE] [Customers] set customers data to local storage'
    );
  }

  getCustomersData(): CustomerModel[] {
    return JSON.parse(localStorage.getItem('customers_data')!);
  }

  deleteCustomerByUserName(userName: string) {
    let customersList = this.getCustomersData();
    customersList = customersList.filter(
      customer => customer.userName !== userName
    );
    console.log(
      '\x1b[36m%s\x1b[0m',
      '[LOCAL STORAGE] [Customers] delete customer from local storage'
    );
    this.setCustomersData(customersList);
    return customersList;
  }
}
