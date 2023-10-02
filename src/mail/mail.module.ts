import { Global, Module } from '@nestjs/common';
import mailconfig = require('./mailconfig');
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRoot(mailconfig),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {
}