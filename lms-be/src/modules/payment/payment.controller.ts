import { Roles } from '@/common/decorators/role.decorator';
import { User, UserInfo } from '@/common/decorators/user.decorator';
import { UserType } from '@/common/enums/userType.enum';
import { AuthenGuard } from '@/common/guards/authen.guard';
import { AuthorGuard } from '@/common/guards/author.guard';
import { Controller, Get, ParseIntPipe, Post, Query, Res, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @UseGuards(AuthorGuard)
  @Roles(UserType.STUDENT)
  @UseGuards(AuthenGuard)
  @Post('checkout')
  async findAll(@Query('courseId', ParseIntPipe) courseId: number, @User() user: UserInfo) {
    return await this.paymentService.checkOut(user, courseId);
  }

  @Get('success')
  async successPayment(@Query('token') token: string, @Query('slug') slug: string, @Res() res) {
    if (!token)
      return res
        .status(301)
        .redirect(`${process.env.BASE_FE_URL}/course/${slug}?error=payment_failed`);
    const successPayment = await this.paymentService.successPayment(token);
    if (successPayment)
      return res.status(301).redirect(`${process.env.BASE_FE_URL}/course/${successPayment.slug}`);
    return false;
  }
}
