export class Gender {
  public static male: string = 'MALE';
  public static female: string = 'FEMALE';
}

export interface CustomerModel {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  showDetails?: boolean;
}
