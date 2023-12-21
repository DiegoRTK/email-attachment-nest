import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailModule } from './resources/email/email.module';
import { MulterModule } from '@nestjs/platform-express';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from './helpers/validation-exception.filter';

@Module({
  imports: [
    EmailModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
})
export class AppModule {}
