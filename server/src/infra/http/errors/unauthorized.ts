import { Unauthorized } from '@app/use-cases/errors/unauthorized';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Unauthorized)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: Unauthorized, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.UNAUTHORIZED;

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        http: {
          path: request.url,
          method: request.method,
          body: request.body,
          params: request.params,
          query: request.query,
        },
        name: 'Unauthorized',
        message: exception.message
      });
  }
}