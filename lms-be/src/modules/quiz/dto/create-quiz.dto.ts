import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  courseId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  questionToPass?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  deadline?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  randomOrder?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  answersAtEnd?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  singleAttempt?: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  minQuestion?: number;
}
