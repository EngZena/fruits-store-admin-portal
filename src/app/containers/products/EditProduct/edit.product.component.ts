import * as fromApp from '@store/app.reducer';
import * as fromProductsActions from '@containers/products/store/products.actions';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '@core/models/FruitModel';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit.product.component.html',
  styleUrls: ['./edit.product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productById!: ProductModel;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(
      new fromProductsActions.GetProductById(
        this.activatedRoute.snapshot.params['id']
      )
    );
    this.store.select('products').subscribe(data => {
      if (data.productById !== null) {
        this.productById! = data.productById;
      }
    });
  }
}
