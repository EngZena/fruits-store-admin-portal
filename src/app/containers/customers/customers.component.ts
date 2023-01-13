import * as pattrens from '@core/constants/pattrens';

import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

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
  customerForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(pattrens.emailPattren),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
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
        if (data === true) {
          this.customersList =
            this.customersLocalStorageService.getCustomersData();
          this.customersDataExist = true;
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

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'string') {
        this.customersList =
          this.customersLocalStorageService.deleteCustomerByUserName(result);
      }
    });
  }

  openEditDialog(customer: CustomerModel, id: number): void {
    this.choosedCustomer = customer;
    this.setCustomerEditForm(customer);
    const isDarkTheme = localStorage.getItem('darkTheme');
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        customer: customer,
        title: `Edit ${customer.userName} details`,
        isDarkTheme: isDarkTheme,
        template: this.customerEditTemplate,
        submitButtonLabel: 'Save',
        cancelButtonLabel: 'Cancel',
        actions: true,
      },
      backdropClass: 'backdrop-background',
    });
  }

  onCancel() {
    this.dialog.closeAll();
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
    if (customersData.length > 0) {
      this.customersDataExist = true;
      customersData.forEach((element: CustomerModel) => {
        element = {
          ...element,
          showDetails: false,
        };
        this.customersList.push(element);
      });
    } else {
      this.customersDataExist = false;
    }
  }

  setCustomerEditForm(customer: CustomerModel) {
    this.customerForm.get('email')?.setValue(customer.email);
    this.customerForm.get('firstName')?.setValue(customer.firstName);
    this.customerForm.get('lastName')?.setValue(customer.lastName);
  }

  saveCustomerDetails(formDirective: FormGroupDirective) {
    if (!this.customerForm.valid) return;
    const result = this.choosedCustomer;
    result.email = this.customerForm.get('email')?.value;
    result.firstName = this.customerForm.get('firstName')?.value;
    result.lastName = this.customerForm.get('lastName')?.value;
    this.customersList =
      this.customersLocalStorageService.editCustomerByUserName(result);
    this.customerForm.reset();
    formDirective.resetForm();
    this.dialog.closeAll();
  }
}
