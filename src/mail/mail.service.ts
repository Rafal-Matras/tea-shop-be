import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

interface ForgotPassword {
  user: string;
  forgotPasswordUrl: string;
}

interface BuyItems {
  user: string;
}

@Injectable()
export class MailService {
  constructor(
    @Inject(MailerService) private mailerService: MailerService
  ) {
  }

  async forgotPassword(to: string, context: ForgotPassword): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject: 'Herbaciany Zakątek - reset hasła',
      template: 'forgot-password',
      context
    });
  }

  async buyItems(to: string, context: BuyItems): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject: 'Herbaciany Zakątek - Zakupiono produkty',
      template: 'buy-items',
      context
    });
  }

}