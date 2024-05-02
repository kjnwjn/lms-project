import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBlogCommentDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  blogId: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  desc: string;
  @IsEmpty()
  createdBy: number;
  @IsEmpty()
  email: string;
}

export class UpdateBlogCommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  desc: string;
  @IsEmpty()
  updatedBy: number;
}
