import { Controller, Post, Param, UseGuards, Body, Get, ParseIntPipe } from '@nestjs/common';
import { QuizSittingService } from './quiz-sitting.service';
import { User, UserInfo } from '@/common/decorators/user.decorator';
import { AuthenGuard } from '@/common/guards/authen.guard';
import { SubmitQuizSittingDto } from './dto/submit-quiz-sitting.dto';
import { TimingQuizSittingDto } from './dto/timing-quiz-sitting.dto';
import { AuthorGuard } from '@/common/guards/author.guard';
import { UserType } from '@/common/enums/userType.enum';
import { Roles } from '@/common/decorators/role.decorator';

@Controller('quiz-sitting')
export class QuizSittingController {
  constructor(private readonly quizSittingService: QuizSittingService) {
    /**Empty */
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.STUDENT)
  @Post('start')
  async init(@Body() body: TimingQuizSittingDto, @User() user: UserInfo) {
    return await this.quizSittingService.init(body, user);
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.STUDENT)
  @Post(':sittingId/finish')
  async finish(
    @Param('sittingId') sittingId: number,
    @Body() body: TimingQuizSittingDto,
    @User() user: UserInfo,
  ) {
    return await this.quizSittingService.finish(sittingId, body, user);
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.STUDENT)
  @Post(':sittingId/submit')
  async submit(
    @Param('sittingId', ParseIntPipe) sittingId: number,
    @Body() body: SubmitQuizSittingDto,
    @User() user: UserInfo,
  ) {
    return await this.quizSittingService.submit(sittingId, body, user);
  }
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.STUDENT)
  @Get('student/:quizId/:quizSittingId')
  async findAllByStudent(
    @Param('quizId', ParseIntPipe) quizId: number,
    @Param('quizSittingId', ParseIntPipe) quizSittingId: number,
    @User() user: UserInfo,
  ) {
    return await this.quizSittingService.findAllByStudent(quizId, quizSittingId, user);
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.STUDENT)
  @Get('get-all/student/:quizId/')
  async findAllByQuizId(@Param('quizId', ParseIntPipe) quizId: number, @User() user: UserInfo) {
    return await this.quizSittingService.findAllByQuizId(quizId, user);
  }
}
