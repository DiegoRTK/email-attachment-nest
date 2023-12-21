import { BadRequestException, Injectable } from '@nestjs/common';
import * as simpleParser from 'mailparser/lib/simple-parser';

@Injectable()
export class EmailService {
  async create(
    email: Express.Multer.File,
    showHeaders: boolean,
  ): Promise<void> {
    if (!email) throw new BadRequestException('The field email is required');
    const jsonData: simpleParser.ParsedMail = {};
    try {
      const mailObject = await simpleParser(email.buffer);
      Object.assign(jsonData, mailObject);
      if (mailObject.attachments && mailObject.attachments.length > 0) {
        jsonData.attachments = mailObject.attachments.map((attachment) => ({
          fileName: attachment.filename,
          contentType: attachment.contentType,
          content: attachment.content.toString('base64'),
        }));
      }
      jsonData.to = jsonData.to.value;
      jsonData.from = jsonData.from.value;
      if (!showHeaders) {
        delete jsonData.headerLines;
        delete jsonData.headers;
      }
      return jsonData;
    } catch (error) {
      throw new BadRequestException('Error: ' + error);
    }
  }
}
