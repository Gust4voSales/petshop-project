import { EntityNotFound } from '@app/use-cases/errors/entity-not-found';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(EntityNotFound)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFound, host: ArgumentsHost) {
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