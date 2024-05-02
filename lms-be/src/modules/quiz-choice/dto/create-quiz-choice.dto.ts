import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuizChoiceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  choice: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  correct: number;
}
