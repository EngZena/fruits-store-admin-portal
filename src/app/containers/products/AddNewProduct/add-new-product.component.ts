import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';

@Component({
  selector: 'app-add-new-poduct-component',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss'],
})
export class AddNewProductComponent {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    FruitType: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    imageName: new FormControl(null, [Validators.required]),
  });

  invalidChars = ['-', '+', 'e', 'E'];

  imageURL: any;
  imageMsg: any;

  FruitsTypes = [
    { value: 'summerFruits', viewValue: 'Summer Fruits' },
    { value: 'winterFruits', viewValue: 'Winter Fruits' },
  ];
  constructor() {}

  keyPressNumbersDecimal(event: KeyboardEvent) {
    if (this.invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  }

  openInput() {
    document.getElementById('fileInput')!.click();
  }

  selectFile(imageInput: any) {
    if (!imageInput.files[0] || imageInput.files[0].length == 0) {
      this.imageMsg = 'You must select an image';
      return;
    }

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
      this.productForm.get('imageName')?.setValue(imageInput.files[0].name);
    };
  }

  addNewFruit() {}
}