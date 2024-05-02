import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MailDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  date: string;
  @IsNotEmpty()
  desc: string;
}
