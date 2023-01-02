export interface FruitModel {
  id: string;
  name: string;
  image: string;
  price: number;
  imageName: string;
}

export class FruitType {
  public static summerFruits: string = 'SUMMER_FRUITS';
  public static winterFruits: string = 'WINTER_FRUITS';
}

export interface ProductModel {
  id: string;
  name: string;
  image: string;
  imageName: string;
  price: number;
  fruitType: FruitType;
}
