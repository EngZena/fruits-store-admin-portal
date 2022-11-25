import * as fromApp from '../../../store/app.reducer';
import * as fromProductsActions from '@containers/products/store/products.actions';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '@core/models/FruitModel';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-product',
  templateUrl: './editProduct.component.html',
  styleUrls: ['./editProduct.component.scss'],
})
export class EditProductComponent implements OnInit {
  productById!: ProductModel | null;
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
      this.productById = data.productById;
    });
  }
}
