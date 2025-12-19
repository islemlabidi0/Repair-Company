import { IsString, IsInt, IsPositive } from 'class-validator';

export class CreateSparePartDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsPositive()
  price: number;
}
