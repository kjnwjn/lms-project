import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XLoggerModule } from './common/Xlogger/Xlogger.module';
import { ExceptionsModule } from './common/exceptions/exceptions.module';
import { UserInterceptor } from './common/interceptors/user.interceptor';
import databaseConfig from './infrastructure/config/database.config';
import jwtConfig from './modules/auth/auth.constants';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlogCommentModule } from './modules/blog-comment/blog-comment.module';
import { BlogModule } from './modules/blog/blog.module';
import { CategoryModule } from './modules/category/category.module';
import { CourseDocsModule } from './modules/course-docs/course-docs.module';
import { CourseVideoModule } from './modules/course-video/course-video.module';
import { CourseModule } from './modules/course/course.module';
import { LevelModule } from './modules/level/level.module';
import { MailModule } from './modules/mail/mail.module';
import { PaymentModule } from './modules/payment/payment.module';
import { QuizChoiceModule } from './modules/quiz-choice/quiz-choice.module';
import { QuizQuestionModule } from './modules/quiz-question/quiz-question.module';
import { QuizSittingModule } from './modules/quiz-sitting/quiz-sitting.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { UserRepository } from './modules/user/repository/user.repository';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    MulterModule.register({
      dest: './src/public/upload',
    }),
    UserModule,
    DatabaseModule,
    ExceptionsModule,
    CategoryModule,
    MailModule,
    XLoggerModule,
    CourseModule,
    CourseVideoModule,
    CourseDocsModule,
    BlogCommentModule,
    AuthModule,
    LevelModule,
    QuizModule,
    QuizQuestionModule,
    QuizChoiceModule,
    QuizSittingModule,
    PaymentModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthenGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthorGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
  /**Empty */
}
