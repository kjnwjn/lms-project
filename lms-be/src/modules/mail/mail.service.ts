import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { XloggerService } from '@/common/Xlogger/Xlogger.service';
import { ExceptionsService } from '@/common/exceptions/exceptions.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly xLoggerService: XloggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    /**Empty */
  }

  async sendToMail(
    toEmail: string,
    subject: string,
    name: string,
    email: string,
    phone: string,
    date: string,
    desc: string,
  ) {
    try {
      this.xLoggerService.log('Sending email to email:' + toEmail + 'subject : ' + subject);
      const isOK = await this.mailerService.sendMail({
        to: toEmail,
        subject: subject,
        context: {
          name,
          email,
          phone,
          date,
          desc,
        },
        template: './send-information.hbs',
      });
      return isOK;
    } catch (error) {
      this.xLoggerService.error(`Sending email to email error: ${error}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }

  }
}
