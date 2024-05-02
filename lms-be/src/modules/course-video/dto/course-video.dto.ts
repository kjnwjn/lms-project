import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCourseVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  summary: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  courseId: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
}

export class UploadedFileDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName?: string;
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;
  @IsEmpty()
  password: string;
}
