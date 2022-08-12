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
    this.getCustomersData();
  }

  getCustomersData() {
    this.route.data.subscribe((data: any) => {
      let result: any[] = [];
      if (data.customersData.length > 0) {
        result = [...data.customersData];
        this.removeAdminFromCustomersList();
        this.customersDataExist = true;
        result.forEach(element => {
          element = {
            ...element,
            showDetails: false,
          };
          this.customersList.push(element);
        });
      }
    });
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
