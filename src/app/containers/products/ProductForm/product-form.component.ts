import * as fromApp from '@store/app.reducer';
import * as fromProductsActions from '@containers/products/store/products.actions';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { ProductModel } from '@core/models/FruitModel';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getRandomInt } from '@core/services/utils/service.utils';

@Component({
  selector: 'app-product-form-component',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    fruitType: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    imageName: new FormControl(null, [Validators.required]),
    startPriceDateTime: new FormControl(null, [Validators.required]),
    endPriceDateTime: new FormControl(null, [Validators.required]),
  });
  invalidChars = ['-', '+', 'e', 'E'];
  imageURL: any;
  imageMsg: any;
  FruitsTypes = [
    { value: 'SUMMER_FRUITS', viewValue: 'Summer Fruits' },
    { value: 'WINTER_FRUITS', viewValue: 'Winter Fruits' },
  ];
  @ViewChild('formDirective') private formDirective!: NgForm;
  @Input() editProductFormMode: boolean = false;
  @Input()
  productData!: ProductModel;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    if (this.editProductFormMode && this.productData !== undefined) {
      this.productForm.get('id')?.setValue(this.productData.id);
      this.productForm.get('name')?.setValue(this.productData.name);
      this.productForm.get('price')?.setValue(this.productData.price);
      this.productForm.get('fruitType')?.setValue(this.productData.fruitType);
      this.productForm.get('image')?.setValue(this.productData.image);
      this.productForm.get('imageName')?.setValue(this.productData.imageName);
      this.imageURL = this.productData.image;
    }
    if (this.editProductFormMode && this.productData === undefined) {
      /**
       * The expected code would retrieve product data from the backend, but because this option does not exist,
       * it will redirect to the product page.
       */
      this.router.navigate(['products']);
    }
  }

  keyPressNumbersDecimal(event: KeyboardEvent) {
    if (this.invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  }

  openInput() {
    document.getElementById('fileInput')!.click();
  }

  selectImage(imageInput: any) {
    if (
      (!imageInput.files[0] || imageInput.files[0].length == 0) &&
      this.productForm.get('image')?.value === null
    ) {
      this.imageMsg = 'You must select an image';
      return;
    }

    if (imageInput.files.length === 0) return;
    const mimeType = imageInput.files[0].type;

    if (
      this.productForm.get('name')?.value == null ||
      this.productForm.get('name')?.value == ''
    ) {
      this.productForm
        .get('name')
        ?.setValue(imageInput.files[0].name.split('.')[0]);
    }

    if (mimeType.match(/image\/*/) == null) {
      this.imageMsg = 'Only images are supported';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(imageInput.files[0]);

    reader.onload = _imageInput => {
      this.imageMsg = 'Image uploaded successfully';
      this.imageURL = reader.result;
      this.productForm.get('image')?.setValue(reader.result);
      this.productForm
        .get('imageName')
        ?.setValue(imageInput.files[0].name.toLowerCase());
    };
  }

  addNewFruit() {
    if (this.productForm.valid) {
      if (this.editProductFormMode) {
        this.store.dispatch(
          new fromProductsActions.UpdateProductById({
            ...this.productForm.getRawValue(),
            id: this.productData.id,
          })
        );
      } else {
        this.store.dispatch(
          new fromProductsActions.AddNewProduct({
            ...this.productForm.getRawValue(),
            id: getRandomInt().toString(),
          })
        );
      }

      this.formDirective.resetForm();
      this.imageMsg = null;
      this.imageURL = null;
      this.router.navigate(['products']);
    }
  }
}
