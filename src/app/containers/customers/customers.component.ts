import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private customersLocalStorageService: CustomersLocalStorageService
  ) {
    this.getCustomersData();
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

  toggleShowDetails(index: number) {
    this.customersList[index].showDetails =
      !this.customersList[index].showDetails;
  }
}
