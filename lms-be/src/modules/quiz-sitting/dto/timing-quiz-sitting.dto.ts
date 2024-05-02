import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TimingQuizSittingDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  courseId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quizId: number;
}
