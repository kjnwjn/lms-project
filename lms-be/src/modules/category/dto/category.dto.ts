import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsEmpty()
  createdBy: number;
  @IsEmpty()
  updatedBy: number;
}

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
