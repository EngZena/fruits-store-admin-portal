import * as fromApp from '@store/app.reducer';
import * as fromProductsActions from '@containers/products/store/products.actions';

import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-form-component',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    fruitType: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    imageName: new FormControl(null, [Validators.required]),
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

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  keyPressNumbersDecimal(event: KeyboardEvent) {
    if (this.invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  }

  openInput() {
    document.getElementById('fileInput')!.click();
  }

  selectFile(imageInput: any) {
    if (
      (!imageInput.files[0] || imageInput.files[0].length == 0) &&
      this.productForm.get('image')?.value === null
    ) {
      this.imageMsg = 'You must select an image';
      return;
    }

    if (imageInput.files.length === 0) return;
    const mimeType = imageInput.files[0].type;

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
      } else {
        this.store.dispatch(
          new fromProductsActions.AddNewProduct({
            ...this.productForm.getRawValue(),
            id: Math.random().toFixed(3).toString(),
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
