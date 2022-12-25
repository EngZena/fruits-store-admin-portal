import { Component, TemplateRef, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CustomerModel } from '@core/models/cusromer.model';
import { CustomersLocalStorageService } from '@core/services/localStorage/customers.local-storage.service';
import { DialogComponent } from '@components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  customersList: CustomerModel[] = [];
  customersDataExist: boolean = false;
  showDetails: boolean = false;
  choosedCustomer!: CustomerModel;
  customerUserName: string = '';
  @ViewChild('customerEditTemplate')
  customerEditTemplate!: TemplateRef<any>;
  @ViewChild('customerDeleteTemplate')
  customerDeleteTemplate!: TemplateRef<any>;
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private customersLocalStorageService: CustomersLocalStorageService
  ) {
    this.getCustomersData();
    this.customersLocalStorageService.resetCustomerData.subscribe(
      (data: Boolean) => {
        if (data == true) {
          this.customersList =
            this.customersLocalStorageService.getCustomersData();
        }
      }
    );
  }

  openRemoveDialog(userName: string, id: number): void {
    this.customerUserName = userName;
    const isDarkTheme = localStorage.getItem('darkTheme');
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        customer: userName,
        isDarkTheme: isDarkTheme,
        submitButtonLabel: 'Yes',
        cancelButtonLabel: 'No',
        template: this.customerDeleteTemplate,
      },
      backdropClass: 'backdrop-background',
    });

    dialogRef.afterClosed().subscribe(_result => {});
  }

  openEditDialog(customer: CustomerModel, id: number): void {
    this.choosedCustomer = customer;
    const isDarkTheme = localStorage.getItem('darkTheme');
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        customer: customer,
        title: `Edit ${customer.userName} details`,
        isDarkTheme: isDarkTheme,
        template: this.customerEditTemplate,
        submitButtonLabel: 'Save',
        cancelButtonLabel: 'Cancel',
      },
      backdropClass: 'backdrop-background',
    });

    dialogRef.afterClosed().subscribe(_result => {});
  }

  getCustomersData() {
    this.route.data.subscribe((data: any) => {
      let result: CustomerModel[] = [];
      if (data.customersData.length > 0) {
        result = [...data.customersData];
        this.setCustomersList(result);
        if (localStorage.getItem('customers_data') == null) {
          return this.customersLocalStorageService.setCustomersData(result);
        }
      }
    });
  }

  setCustomersList(customersData: CustomerModel[]) {
    this.customersDataExist = true;
    customersData.forEach((element: CustomerModel) => {
      element = {
        ...element,
        showDetails: false,
      };
      this.customersList.push(element);
    });
  }
}
