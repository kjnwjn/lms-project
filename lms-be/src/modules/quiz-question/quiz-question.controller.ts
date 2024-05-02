import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { User, UserInfo } from '@/common/decorators/user.decorator';
import { AuthenGuard } from '@/common/guards/authen.guard';
import { AuthorGuard } from '@/common/guards/author.guard';
import { Roles } from '@/common/decorators/role.decorator';
import { UserType } from '@/common/enums/userType.enum';

@Controller('quiz-question')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {
    /**Empty */
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN, UserType.LECTURER)
  @Post(':id')
  async create(
    @Param('id') id: number,
    @User() user: UserInfo,
    @Body() createQuizQuestionDto: CreateQuizQuestionDto,
  ) {
    return await this.quizQuestionService.create(id, createQuizQuestionDto, user);
  }

  @UseGuards(AuthenGuard)
  @Get(':id/all')
  async findAll(@Param('id') id: number) {
    return await this.quizQuestionService.findAll(id);
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN, UserType.LECTURER)
  @Get('admin/:id/all')
  async findAllByAdmin(@Param('id') id: number) {
    return await this.quizQuestionService.findAllByAdmin(id);
  }

  @UseGuards(AuthenGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.quizQuestionService.findOne(id);
  }

  @UseGuards(AuthenGuard)
  @Patch(':quizId/:questionId')
  async update(
    @Param('quizId') quizId: number,
    @Param('questionId') questionId: number,
    @User() user: UserInfo,
    @Body() updateQuizQuestionDto: UpdateQuizQuestionDto,
  ) {
    return await this.quizQuestionService.update(quizId, questionId, updateQuizQuestionDto, user);
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN, UserType.LECTURER)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.quizQuestionService.remove(id);
  }
}
