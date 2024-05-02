import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class SubmitQuizSittingDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  courseId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quizId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  questionId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  choiceId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  isMultipleChoice: number;
}
