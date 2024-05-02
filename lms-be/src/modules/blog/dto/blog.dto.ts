import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
  @IsEmpty()
  userId: number;
  @IsEmpty()
  createdBy: number;
}

export class UpdateBlogDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
