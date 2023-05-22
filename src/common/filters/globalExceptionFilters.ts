import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    const response =
      exception instanceof HttpException
        ? {
          message: (exception.getResponse() as any)?.message,
          error: (exception.getResponse() as any)?.error,
        }
        : { error: 'Internal Server Error' };

    res.status(status).json(response);
  }
}