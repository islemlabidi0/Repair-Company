import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateSparePartDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsNumber()
  price?: number;
}
