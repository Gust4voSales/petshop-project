import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from '@infra/http/errors/not-found-exception';
import { InvalidDeleteOperationExceptionFilter } from '@infra/http/errors/invalid-delete-operation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalFilters(new InvalidDeleteOperationExceptionFilter());

  app.enableCors();
  await app.listen(3333);
}
bootstrap();
