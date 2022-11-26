import * as fromApp from '@store/app.reducer';
import * as fromProductsActions from '@containers/products/store/products.actions';

import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-new-poduct-component',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss'],
})
export class AddNewProductComponent {
  constructor() {}
}
