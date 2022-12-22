import { ActivatedRoute } from '@angular/router';
/* eslint-disable no-console */
import { Component } from '@angular/core';
import { DialogComponent } from '@components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.getCustomersData();
    if (localStorage.getItem('customers_data') === null) {
      localStorage.setItem(
        'customers_data',
        JSON.stringify(this.customersList)
      );
    }
  }

  openDialog(userName: string, id: number): void {
    const isDarkTheme = localStorage.getItem('darkTheme');
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { name: userName, id: id, isDarkTheme: isDarkTheme },
      backdropClass: 'backdrop-background',
    });

    dialogRef.afterClosed().subscribe(_result => {});
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
