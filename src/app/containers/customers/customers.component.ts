/* eslint-disable no-console */
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { adminEmail } from '@containers/login-page/admin.data';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  customersList: any[] = [];
  customersDataExist: boolean = false;
  showDetails: boolean = false;
  constructor(private route: ActivatedRoute) {
    if (localStorage.getItem('customers_data') === null) {
      this.getCustomersData();
      localStorage.setItem(
        'customers_data',
        JSON.stringify(this.customersList)
      );
      console.log(
        '\x1b[36m%s\x1b[0m',
        '[LOCAL STORAGE] [Customers] set customers data in local storage'
      );
    } else {
      this.setCustomersList(
        JSON.parse(localStorage.getItem('customers_data')!)
      );
      console.log(
        '\x1b[36m%s\x1b[0m',
        '[LOCAL STORAGE] [Customers] get customers data from local storage'
      );
    }
  }

  getCustomersData() {
    this.route.data.subscribe((data: any) => {
      let result: any[] = [];
      if (data.customersData.length > 0) {
        result = [...data.customersData];
        this.setCustomersList(result);
      }
    });
  }

  setCustomersList(customersData: any[]) {
    this.customersDataExist = true;
    customersData.forEach((element: any) => {
      element = {
        ...element,
        showDetails: false,
      };
      this.customersList.push(element);
    });
    this.removeAdminFromCustomersList();
  }

  removeAdminFromCustomersList() {
    this.customersList = this.customersList.filter(
      data => data.email !== adminEmail
    );
  }

  toggleShowDetails(index: number) {
    this.customersList[index].showDetails =
      !this.customersList[index].showDetails;
  }
}
