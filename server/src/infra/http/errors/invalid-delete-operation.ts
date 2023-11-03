import { EntityNotFound } from '@app/use-cases/errors/entity-not-found';
import { InvalidDeleteOperation } from '@app/use-cases/errors/invalid-delete-operation';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(InvalidDeleteOperation)
export class InvalidDeleteOperationExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFound, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.BAD_REQUEST;

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        http: {
          path: request.url,
          method: request.method,
          params: request.params,
        },
        name: 'InvalidDeleteOperation',
        message: exception.message
      });
  }
}