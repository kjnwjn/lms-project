import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isBoolean } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  credit: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  summary: string;
  @IsNumber()
  @ApiProperty()
  levelId: number;
}

export class AdminCreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  credit: number;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  summary: string;
  @IsNumber()
  @ApiProperty()
  levelId: number;
}
export class UpdateCourseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsOptional()
  title?: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  credit?: number;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  @IsOptional()
  email?: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  summary?: string;
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  levelId?: number;
}
