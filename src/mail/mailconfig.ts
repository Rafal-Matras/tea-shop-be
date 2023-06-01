import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { config } from '../config/config';

export = {
  transport: `smtp://${config.mailUserName}:${config.mailPassword}@${config.mailHost}:${config.mailPort}`,
  defaults: {
    from: config.mailEmail
  },
  template: {
    dir: join(__dirname,'../../src/mail/templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true
    }
  }
}