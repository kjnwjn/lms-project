import { Controller, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { QuizChoiceService } from './quiz-choice.service';
import { CreateQuizChoiceDto } from './dto/create-quiz-choice.dto';
import { UpdateQuizChoiceDto } from './dto/update-quiz-choice.dto';
import { User, UserInfo } from '@/common/decorators/user.decorator';
import { AuthenGuard } from '@/common/guards/authen.guard';
import { AuthorGuard } from '@/common/guards/author.guard';
import { Roles } from '@/common/decorators/role.decorator';
import { UserType } from '@/common/enums/userType.enum';

@Controller('quiz-choice')
export class QuizChoiceController {
  constructor(private readonly quizChoiceService: QuizChoiceService) {
    /**Empty */
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN, UserType.LECTURER)
  @Post(':id')
  async create(
    @Param('id') questionId: number,
    @Body() createQuizChoiceDto: CreateQuizChoiceDto,
    @User() user: UserInfo,
  ) {
    return await this.quizChoiceService.create(questionId, createQuizChoiceDto, user);
  }

  @UseGuards(AuthenGuard)
  @Patch(':questionId/:choiceId')
  async update(
    @Param('questionId') questionId: number,
    @Param('choiceId') choiceId: number,
    @Body() updateQuizChoiceDto: UpdateQuizChoiceDto,
    @User() user: UserInfo,
  ) {
    return await this.quizChoiceService.update(questionId, choiceId, updateQuizChoiceDto, user);
  }

  @UseGuards(AuthenGuard)
  @Patch('submit/choice/:id')
  async submit(
    @Param('id', ParseIntPipe) id: number,
    @Query('questionId') questionId: number,
    @Query('quizId') quizId: number,
    // @Body() updateQuizDto: UpdateQuizDto,
    // @User() user: UserInfo,
  ) {
    return await this.quizChoiceService.verifiedAnswer(quizId, questionId, id);
  }
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN, UserType.LECTURER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.quizChoiceService.remove(+id);
  }
}
