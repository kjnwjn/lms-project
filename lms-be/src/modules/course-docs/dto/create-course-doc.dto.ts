import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDocDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  courseId: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
}
