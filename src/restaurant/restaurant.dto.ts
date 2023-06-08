export class CreateRestaurantDto {
  readonly address: AddressDto;
  readonly borough: string;
  readonly cuisine: string;
  readonly grades: GradeDto[];
  readonly name: string;
  readonly restaurant_id: number;
}

export class AddressDto {
  readonly building: string;
  readonly coord: number[];
  readonly street: string;
  readonly zipcode: string;
}

export class GradeDto {
  readonly date: Date;
  readonly grade: string;
  readonly score: number;
}
