export interface FruitsModel {
  id: string;
  name: string;
  image: string;
  price: number;
}

export class FruitType {
  public static summerFruits: string = 'SUMMER_FRUITS';
  public static winterFruits: string = 'WINTER_FRUITS';
}

export interface ProductsModel {
  id: string;
  name: string;
  image: string;
  price: number;
  fruitType: FruitType;
}
