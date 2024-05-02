import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateFileGeneralDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsNotEmpty()
  type: string;
  @IsString()
  @IsNotEmpty()
  path: string;
  @IsNumber()
  @IsPositive()
  size: number;
}

export class UpdateFileGeneralDto extends PartialType(CreateFileGeneralDto) {
  /**Empty */
}
