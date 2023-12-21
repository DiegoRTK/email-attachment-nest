import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEmailDto } from './dto/create-email.dto';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as simpleParser from 'mailparser/lib/simple-parser';

@Controller('email')
@ApiTags('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiResponse({
    status: 200,
    description: 'A JSON with extracted email info will be provided',
    type: simpleParser.ParsedMail,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request exception',
  })
  @ApiResponse({
    status: 401,
    description: 'Not authorized',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'binary',
        },
        showHeaders: {
          type: 'boolean',
          example: false,
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('')
  @UseInterceptors(FileInterceptor('email'))
  create(@Body() createEmailDto: CreateEmailDto, @UploadedFile() file) {
    return this.emailService.create(file, createEmailDto.showHeaders);
  }
}
