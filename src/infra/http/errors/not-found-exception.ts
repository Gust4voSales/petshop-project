import { CustomerNotFound } from '@app/use-cases/errors/customer-not-found';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(CustomerNotFound)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: CustomerNotFound, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.NOT_FOUND;

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
        message: exception.message
      });
  }
}