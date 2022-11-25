import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FruitType } from '@core/models/FruitModel';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input()
  imgName: string = '';

  @Input()
  name: string = '';

  @Input()
  price: string = '';

  @Input()
  category!: FruitType;

  @Output()
  productDeleted: EventEmitter<any> = new EventEmitter();

  @Output()
  productEdited: EventEmitter<any> = new EventEmitter();

  deleteProduct() {
    this.productDeleted.emit();
  }

  editProduct() {
    this.productEdited.emit();
  }
}
