import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { AuthorGuard } from '@/common/guards/author.guard';
import { Roles } from '@/common/decorators/role.decorator';
import { UserType } from '@/common/enums/userType.enum';
import { User, UserInfo } from '@/common/decorators/user.decorator';
import { Quiz } from './entities/quiz.entity';
import { AuthenGuard } from '@/common/guards/authen.guard';
import { Role } from '../user/entities/role.entity';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {
    /**Empty */
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN, UserType.LECTURER)
  @Post('new')
  async create(@Body() createQuizDto: CreateQuizDto, @User() user: UserInfo): Promise<Quiz> {
    return await this.quizService.create(createQuizDto, user);
  }

  @UseGuards(AuthenGuard)
  @Get('all')
  async findAll() {
    return await this.quizService.findAll();
  }


  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN, UserType.LECTURER)
  @Get('/get-quizs-by-course-id')
  async findAllsByCourseId(
    @Query('courseId', ParseIntPipe) courseId: number,
    @User() user: UserInfo,
  ) {
    return await this.quizService.findAllsByCourseId(courseId, user);
  }
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.STUDENT)
  @Get('get-all-by-course-id/student')
  async studentFindAllsByCourseId(@Query('courseId') courseId: number, @User() user: UserInfo) {
    return await this.quizService.studentFindAllsByCourseId(courseId, user);
  }

  @UseGuards(AuthenGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.quizService.findOne(id);
  }

  @UseGuards(AuthenGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuizDto: UpdateQuizDto,
    @User() user: UserInfo,
  ) {
    return await this.quizService.update(id, updateQuizDto, user);
  }

  @UseGuards(AuthenGuard)
  @Patch(':id/publish')
  async publish(@Param('id', ParseIntPipe) id: number, @User() user: UserInfo) {
    return await this.quizService.publish(id, user);
  }

  @UseGuards(AuthenGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.quizService.remove(id);
  }
}
