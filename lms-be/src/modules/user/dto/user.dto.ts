import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class SignupUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @ApiProperty()
  address: string;

  @IsOptional()
  @ApiProperty()
  picture: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  password?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  phone?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  address?: string;
}

export class UploadedFileDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class LecturerActivatingDto {
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  email?: string;
}
