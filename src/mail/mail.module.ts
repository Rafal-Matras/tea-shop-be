import { Module } from '@nestjs/common';
import mailerconfig = require('./mailconfig');
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot(mailerconfig),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {
}