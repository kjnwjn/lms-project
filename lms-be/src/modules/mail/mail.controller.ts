import { Body, Controller, Post } from '@nestjs/common';
import { XloggerService } from 'src/common/Xlogger/Xlogger.service';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';
import { MailDto } from './dtos/mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly logger: XloggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    /**Empty */
  }

  @Post('send')
  async sendMail(@Body() mailDto: MailDto) {
    try {
      this.logger.log('Send mail information: [' + JSON.stringify(mailDto) + ']');
      return await this.mailService.sendToMail(
        'kjnwjnpham@gmail.com',
        'VAN NAM WEDDING',
        mailDto.name,
        mailDto.email,
        mailDto.phone,
        mailDto.date,
        mailDto.desc,
      );
    } catch (error) {
      this.exceptionService.badRequestException({ message: error?.message });
    }
  }
}
