import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './helpers/validation-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Email attachment')
    .setDescription('The Email attachment API description')
    .setVersion('1.0')
    .build();
  app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
