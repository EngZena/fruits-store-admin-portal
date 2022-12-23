import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomersLocalStorageService {
  resetCustomersData() {
    localStorage.removeItem('customers_data');
  }
}
