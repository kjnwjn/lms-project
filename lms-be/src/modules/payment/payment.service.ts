import { XloggerService } from '@/common/Xlogger/Xlogger.service';
import { UserInfo } from '@/common/decorators/user.decorator';
import { ExceptionsService } from '@/common/exceptions/exceptions.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import Stripe from 'stripe';
import { CourseService } from '../course/course.service';
import { Course } from '../course/entities/course.entity';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  constructor(
    private readonly exceptionService: ExceptionsService,
    private readonly logger: XloggerService,
    private readonly courseService: CourseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(process.env.API_STRIPE_SECRET_KEY);
  }
  async checkOut(user: UserInfo, courseId: number) {
    try {
      this.logger.log('PaymentService.checkOut information:' + JSON.stringify(courseId));
      const isCourseExist = await this.courseService.findOneById(courseId);
      if (!isCourseExist)
        throw this.exceptionService.notFoundException({
          message: 'Course not found',
        });
      const isUserInCourse = await this.courseService.checkStudentInCourse(
        courseId,
        Number(user.id),
      );
      if (isUserInCourse)
        throw this.exceptionService.badRequestException({
          message: 'User already in this course',
        });
      const token = await this.jwtService.signAsync({ userId: user.id, courseId });
      const session = await this.stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price_data: {
              currency: 'usd',
              product_data: {
                name: isCourseExist.title,
                description: isCourseExist.summary,
                images: [isCourseExist.thumbnail],
              },
              unit_amount: isCourseExist.credit * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/${process.env.API_VERSION}/payment/success?token=${token}&slug=${isCourseExist.slug}`,
        cancel_url: `${process.env.BASE_URL}/${process.env.API_VERSION}/payment/success?slug=${isCourseExist.slug}`,
      });

      return session.url;
    } catch (error) {
      // this.logger.error('PaymentService.checkOut error:' + JSON.stringify(error.message));
      console.log(error);

      this.exceptionService.badRequestException({
        message: 'PaymentService.checkOut error',
      });
    }
  }

  async successPayment(token: string): Promise<Course> {
    try {
      this.logger.log('PaymentService.successPayment information');
      const payload: any = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('TOKEN'),
      });
      return await this.courseService.paymentSuccess(
        Number(payload.courseId),
        Number(payload.userId),
      );
    } catch (error) {
      this.logger.error('PaymentService.successPayment error:' + JSON.stringify(error.message));
      this.exceptionService.badRequestException({
        message: 'PaymentService.successPayment error',
      });
    }
  }
}
